<script module lang="ts">
  export type DatePickerMode = 'single' | 'multiple' | 'range';

  export interface DateRange {
    from?: Date;
    to?: Date;
  }

  export type DatePickerSelection = Date | Date[] | DateRange | undefined;
</script>

<script lang="ts">
  import { CaretLeft, CaretRight } from 'phosphor-svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  type DisabledMatcher = Date | Date[] | ((date: Date) => boolean);

  interface Props {
    mode?: DatePickerMode;
    selected?: DatePickerSelection;
    onChange?: (selection: DatePickerSelection) => void;
    month?: Date;
    onMonthChange?: (month: Date) => void;
    numberOfMonths?: number;
    min?: number;
    max?: number;
    disabled?: boolean | DisabledMatcher;
    footer?: Snippet | string;
    fixedWeeks?: boolean;
    locale?: string;
    class?: string;
    className?: string;
    classNames?: Record<string, string | undefined>;
    [key: string]: unknown;
  }

  let {
    mode = 'single',
    selected = $bindable<DatePickerSelection>(),
    onChange,
    month = $bindable<Date | undefined>(),
    onMonthChange,
    numberOfMonths = 1,
    min,
    max,
    disabled = false,
    footer,
    fixedWeeks = true,
    locale = 'en-US',
    class: className,
    className: reactClassName,
    classNames,
    ...rest
  }: Props = $props();

  const today = startOfDay(new Date());
  let internalMonth = $state(startOfMonth(month ?? getSelectionMonth(selected) ?? today));
  let navigationDirection = $state<'before' | 'after' | undefined>();
  let animationTimer: ReturnType<typeof setTimeout> | undefined;

  const displayMonth = $derived(startOfMonth(month ?? internalMonth));
  const visibleMonths = $derived(
    Array.from({ length: Math.max(1, numberOfMonths) }, (_, index) => addMonths(displayMonth, index))
  );
  const rootClass = $derived(cn('rdp-root select-none rounded-xl bg-kumo-base', classNames?.root, reactClassName, className));

  function emit(nextSelection: DatePickerSelection) {
    selected = nextSelection;
    onChange?.(nextSelection);
  }

  function setMonth(nextMonth: Date) {
    const normalized = startOfMonth(nextMonth);
    navigationDirection = normalized.getTime() > displayMonth.getTime() ? 'after' : 'before';
    internalMonth = normalized;
    month = normalized;
    onMonthChange?.(normalized);
    if (animationTimer) clearTimeout(animationTimer);
    animationTimer = setTimeout(() => {
      navigationDirection = undefined;
      animationTimer = undefined;
    }, 200);
  }

  function handleDayClick(day: Date) {
    if (isDisabled(day)) return;

    if (mode === 'multiple') {
      const dates = Array.isArray(selected) ? selected : [];
      const existingIndex = dates.findIndex((date) => isSameDay(date, day));

      if (existingIndex >= 0) {
        emit(dates.filter((_, index) => index !== existingIndex));
        return;
      }

      if (max !== undefined && dates.length >= max) return;
      emit([...dates, day]);
      return;
    }

    if (mode === 'range') {
      const range = isDateRange(selected) ? selected : undefined;

      if (!range?.from || range.to || compareDays(day, range.from) < 0) {
        emit({ from: day, to: undefined });
        return;
      }

      const nights = differenceInDays(range.from, day);
      if ((min !== undefined && nights < min) || (max !== undefined && nights > max)) return;
      emit({ from: range.from, to: day });
      return;
    }

    emit(day);
  }

  function isDisabled(day: Date) {
    if (disabled === true) return true;
    if (!disabled) return false;
    if (disabled instanceof Date) return isSameDay(day, disabled);
    if (Array.isArray(disabled)) return disabled.some((date) => isSameDay(day, date));
    return disabled(day);
  }

  const isOutsideMonth = (day: Date, month: Date) => day.getMonth() !== month.getMonth();

  function isSelected(day: Date) {
    if (mode === 'multiple') {
      return Array.isArray(selected) && selected.some((date) => isSameDay(date, day));
    }

    if (mode === 'range') {
      const range = isDateRange(selected) ? selected : undefined;
      return Boolean(range?.from && isSameDay(range.from, day)) || Boolean(range?.to && isSameDay(range.to, day));
    }

    return selected instanceof Date && isSameDay(selected, day);
  }

  function isRangeStart(day: Date) {
    return mode === 'range' && isDateRange(selected) && Boolean(selected.from && isSameDay(selected.from, day));
  }

  function isRangeEnd(day: Date) {
    return mode === 'range' && isDateRange(selected) && Boolean(selected.to && isSameDay(selected.to, day));
  }

  function isRangeMiddle(day: Date) {
    if (mode !== 'range' || !isDateRange(selected) || !selected.from || !selected.to) return false;
    return compareDays(day, selected.from) > 0 && compareDays(day, selected.to) < 0;
  }

  function getMonthLabel(date: Date) {
    return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
  }

  function getWeekdayLabels() {
    const baseSunday = new Date(2026, 0, 4);
    return Array.from({ length: 7 }, (_, index) => {
      const label = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(addDays(baseSunday, index));
      return label.replace(/\.$/, '').slice(0, 2);
    });
  }

  function getWeeks(monthDate: Date) {
    const firstOfMonth = startOfMonth(monthDate);
    const firstGridDay = addDays(firstOfMonth, -firstOfMonth.getDay());
    const weeks = [];
    const weekCount = fixedWeeks ? 6 : Math.max(5, Math.ceil((firstOfMonth.getDay() + daysInMonth(firstOfMonth)) / 7));

    for (let weekIndex = 0; weekIndex < weekCount; weekIndex += 1) {
      weeks.push(Array.from({ length: 7 }, (_, dayIndex) => addDays(firstGridDay, weekIndex * 7 + dayIndex)));
    }

    return weeks;
  }

  function getSelectionMonth(selection: DatePickerSelection) {
    if (selection instanceof Date) return selection;
    if (Array.isArray(selection)) return selection[0];
    if (isDateRange(selection)) return selection.from ?? selection.to;
    return undefined;
  }

  function isDateRange(value: DatePickerSelection): value is DateRange {
    return Boolean(value && !(value instanceof Date) && !Array.isArray(value) && ('from' in value || 'to' in value));
  }

  function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function addDays(date: Date, days: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  }

  function addMonths(date: Date, months: number) {
    return new Date(date.getFullYear(), date.getMonth() + months, 1);
  }

  function daysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function compareDays(a: Date, b: Date) {
    return startOfDay(a).getTime() - startOfDay(b).getTime();
  }

  function differenceInDays(start: Date, end: Date) {
    return Math.round((startOfDay(end).getTime() - startOfDay(start).getTime()) / 86_400_000);
  }

  function isSameDay(a: Date, b: Date) {
    return compareDays(a, b) === 0;
  }

  function getAnimationClass(kind: 'caption' | 'weeks', phase: 'enter' | 'exit') {
    if (!navigationDirection) return undefined;
    return `rdp-${kind}_${navigationDirection}_${phase}`;
  }
</script>

<div class={rootClass} data-nav-layout="after" data-mode={mode} {...rest}>
  <div class="rdp-months">
    {#each visibleMonths as visibleMonth, index (visibleMonth.toISOString())}
      <div class={cn('rdp-month', classNames?.month)}>
        <div
          class={cn(
            'rdp-month_caption',
            getAnimationClass('caption', 'enter'),
            classNames?.month_caption
          )}
        >
          <span class={cn('rdp-caption_label', classNames?.caption_label)}>{getMonthLabel(visibleMonth)}</span>
        </div>

        <div class="rdp-month_grid_wrapper">
          <table class={cn('rdp-month_grid', classNames?.month_grid)}>
            <thead aria-hidden="true">
              <tr class="rdp-weekdays">
                {#each getWeekdayLabels() as weekday (weekday)}
                  <th class={cn('rdp-weekday', classNames?.weekday)} scope="col">{weekday}</th>
                {/each}
              </tr>
            </thead>
            <tbody class={cn('rdp-weeks', getAnimationClass('weeks', 'enter'))}>
              {#each getWeeks(visibleMonth) as week (week[0].toISOString())}
                <tr class="rdp-week">
                  {#each week as day (day.toISOString())}
                    <td
                      class={cn(
                        'rdp-day',
                        isOutsideMonth(day, visibleMonth) && 'rdp-outside',
                        isSameDay(day, today) && 'rdp-today',
                        isSelected(day) && 'rdp-selected',
                        isDisabled(day) && 'rdp-disabled',
                        isRangeStart(day) && 'rdp-range_start',
                        isRangeMiddle(day) && 'rdp-range_middle',
                        isRangeEnd(day) && 'rdp-range_end',
                        !isDisabled(day) && 'rdp-focusable',
                        classNames?.day
                      )}
                      data-day={day.toISOString()}
                    >
                      <button
                        type="button"
                        class={cn('rdp-day_button', classNames?.day_button)}
                        disabled={isDisabled(day)}
                        aria-label={day.toLocaleDateString(locale, { dateStyle: 'full' })}
                        aria-pressed={isSelected(day)}
                        onclick={() => handleDayClick(day)}
                      >
                        {day.getDate()}
                      </button>
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/each}
  </div>

  <div class={cn('rdp-nav', classNames?.nav)}>
    <button
      type="button"
      class={cn('rdp-button_previous', classNames?.button_previous)}
      aria-label="Previous month"
      onclick={() => setMonth(addMonths(displayMonth, -1))}
    >
      <CaretLeft class="rdp-chevron" size={16} aria-hidden="true" />
    </button>
    <button
      type="button"
      class={cn('rdp-button_next', classNames?.button_next)}
      aria-label="Next month"
      onclick={() => setMonth(addMonths(displayMonth, 1))}
    >
      <CaretRight class="rdp-chevron" size={16} aria-hidden="true" />
    </button>
  </div>

  {#if footer}
    <div class={cn('rdp-footer', classNames?.footer)}>
      {#if typeof footer === 'string'}
        <span class="text-xs text-kumo-subtle">{footer}</span>
      {:else}
        {@render footer()}
      {/if}
    </div>
  {/if}
</div>
