<script module lang="ts">
  export type DatePickerMode = 'single' | 'multiple' | 'range';

  export interface DateRange {
    from?: Date;
    to?: Date;
  }

  export type DatePickerSelection = Date | Date[] | DateRange | undefined;
  export type DateMatcher =
    | boolean
    | Date
    | DateRange
    | { before: Date }
    | { after: Date }
    | { from: Date; to: Date }
    | { dayOfWeek: number[] }
    | ((date: Date) => boolean);
</script>

<script lang="ts">
  import { CaretLeft, CaretRight } from 'phosphor-svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  type CaptionLayout = 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
  type NavLayout = 'around' | 'after';

  interface Props {
    mode?: DatePickerMode;
    selected?: DatePickerSelection;
    onChange?: (selection: DatePickerSelection) => void;
    month?: Date;
    onMonthChange?: (month: Date) => void;
    numberOfMonths?: number;
    min?: number;
    max?: number;
    required?: boolean;
    excludeDisabled?: boolean;
    disabled?: DateMatcher | DateMatcher[];
    hidden?: DateMatcher | DateMatcher[];
    startMonth?: Date;
    endMonth?: Date;
    fromMonth?: Date;
    toMonth?: Date;
    captionLayout?: CaptionLayout;
    navLayout?: NavLayout;
    hideNavigation?: boolean;
    disableNavigation?: boolean;
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
    required = false,
    excludeDisabled = false,
    disabled = false,
    hidden,
    startMonth,
    endMonth,
    fromMonth,
    toMonth,
    captionLayout = 'label',
    navLayout = 'after',
    hideNavigation = false,
    disableNavigation = false,
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
  const navigationStart = $derived(startMonth ?? fromMonth);
  const navigationEnd = $derived(endMonth ?? toMonth);
  const canNavigatePrevious = $derived(!disableNavigation && (!navigationStart || compareMonths(addMonths(displayMonth, -1), navigationStart) >= 0));
  const canNavigateNext = $derived(
    !disableNavigation && (!navigationEnd || compareMonths(addMonths(displayMonth, numberOfMonths), navigationEnd) <= 0)
  );
  const showCaptionDropdowns = $derived(captionLayout !== 'label');
  const rootClass = $derived(cn('rdp-root select-none rounded-xl bg-kumo-base', classNames?.root, reactClassName, className));

  function emit(nextSelection: DatePickerSelection) {
    selected = nextSelection;
    onChange?.(nextSelection);
  }

  function setMonth(nextMonth: Date) {
    const normalized = clampMonth(startOfMonth(nextMonth));
    if (compareMonths(normalized, displayMonth) === 0) return;
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
        if (required && dates.length <= Math.max(1, min ?? 0)) return;
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
      if (excludeDisabled && rangeContainsMatcher(range.from, day, disabled)) return;
      emit({ from: range.from, to: day });
      return;
    }

    if (required && selected instanceof Date && isSameDay(selected, day)) return;
    emit(day);
  }

  function isDisabled(day: Date) {
    return matches(day, disabled);
  }

  function isHidden(day: Date) {
    return matches(day, hidden);
  }

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

  function getMonthOptions() {
    return Array.from({ length: 12 }, (_, index) => {
      const optionMonth = new Date(displayMonth.getFullYear(), index, 1);
      return {
        value: String(index),
        label: new Intl.DateTimeFormat(locale, { month: 'long' }).format(optionMonth)
      };
    });
  }

  function getYearOptions() {
    const currentYear = displayMonth.getFullYear();
    const startYear = navigationStart?.getFullYear() ?? currentYear - 100;
    const endYear = navigationEnd?.getFullYear() ?? currentYear + 100;
    return Array.from({ length: Math.max(1, endYear - startYear + 1) }, (_, index) => startYear + index);
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

  function isMatcherRange(value: unknown): value is DateRange {
    return Boolean(value && typeof value === 'object' && ('from' in value || 'to' in value));
  }

  function matches(day: Date, matcher: DateMatcher | DateMatcher[] | undefined): boolean {
    if (typeof matcher === 'boolean') return matcher;
    if (!matcher) return false;
    if (Array.isArray(matcher)) return matcher.some((entry) => matches(day, entry));
    if (matcher instanceof Date) return isSameDay(day, matcher);
    if (typeof matcher === 'function') return matcher(day);
    if (isMatcherRange(matcher)) {
      const from = matcher.from ? compareDays(day, matcher.from) >= 0 : true;
      const to = matcher.to ? compareDays(day, matcher.to) <= 0 : true;
      return from && to;
    }
    if ('before' in matcher) return compareDays(day, matcher.before) < 0;
    if ('after' in matcher) return compareDays(day, matcher.after) > 0;
    if ('dayOfWeek' in matcher) return matcher.dayOfWeek.includes(day.getDay());
    return false;
  }

  function rangeContainsMatcher(from: Date, to: Date, matcher: DateMatcher | DateMatcher[] | undefined) {
    const start = compareDays(from, to) <= 0 ? from : to;
    const end = compareDays(from, to) <= 0 ? to : from;
    for (let day = startOfDay(start); compareDays(day, end) <= 0; day = addDays(day, 1)) {
      if (matches(day, matcher)) return true;
    }
    return false;
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

  function compareMonths(a: Date, b: Date) {
    return startOfMonth(a).getTime() - startOfMonth(b).getTime();
  }

  function clampMonth(date: Date) {
    if (navigationStart && compareMonths(date, navigationStart) < 0) return startOfMonth(navigationStart);
    if (navigationEnd && compareMonths(date, navigationEnd) > 0) return startOfMonth(navigationEnd);
    return date;
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

<div class={rootClass} data-nav-layout={navLayout} data-mode={mode} {...rest}>
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
          {#if showCaptionDropdowns && index === 0}
            <div class="rdp-dropdowns">
              {#if captionLayout === 'dropdown' || captionLayout === 'dropdown-months'}
                <select
                  class={cn('rdp-dropdown rdp-months_dropdown', classNames?.dropdown, classNames?.months_dropdown)}
                  aria-label="Choose the month"
                  value={String(displayMonth.getMonth())}
                  disabled={disableNavigation}
                  onchange={(event) => setMonth(new Date(displayMonth.getFullYear(), Number(event.currentTarget.value), 1))}
                >
                  {#each getMonthOptions() as option (option.value)}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              {/if}
              {#if captionLayout === 'dropdown' || captionLayout === 'dropdown-years'}
                <select
                  class={cn('rdp-dropdown rdp-years_dropdown', classNames?.dropdown, classNames?.years_dropdown)}
                  aria-label="Choose the year"
                  value={String(displayMonth.getFullYear())}
                  disabled={disableNavigation}
                  onchange={(event) => setMonth(new Date(Number(event.currentTarget.value), displayMonth.getMonth(), 1))}
                >
                  {#each getYearOptions() as year (year)}
                    <option value={String(year)}>{year}</option>
                  {/each}
                </select>
              {/if}
            </div>
          {:else}
            <span class={cn('rdp-caption_label', classNames?.caption_label)}>{getMonthLabel(visibleMonth)}</span>
          {/if}
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
                    {@const outside = day.getMonth() !== visibleMonth.getMonth()}
                    {@const dayDisabled = isDisabled(day)}
                    {@const dayHidden = isHidden(day)}
                    <td
                      class={cn(
                        'rdp-day',
                        outside && 'rdp-outside',
                        dayHidden && 'rdp-hidden',
                        isSameDay(day, today) && 'rdp-today',
                        isSelected(day) && 'rdp-selected',
                        dayDisabled && 'rdp-disabled',
                        isRangeStart(day) && 'rdp-range_start',
                        isRangeMiddle(day) && 'rdp-range_middle',
                        isRangeEnd(day) && 'rdp-range_end',
                        !dayDisabled && 'rdp-focusable',
                        classNames?.day
                      )}
                      data-day={day.toISOString()}
                    >
                      {#if !dayHidden}
                        <button
                          type="button"
                          class={cn('rdp-day_button', classNames?.day_button)}
                          disabled={dayDisabled}
                          aria-label={day.toLocaleDateString(locale, { dateStyle: 'full' })}
                          aria-pressed={isSelected(day)}
                          onclick={() => handleDayClick(day)}
                        >
                          {day.getDate()}
                        </button>
                      {/if}
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

  {#if !hideNavigation}
  <div class={cn('rdp-nav', classNames?.nav)}>
    <button
      type="button"
      class={cn('rdp-button_previous', classNames?.button_previous)}
      aria-label="Previous month"
      disabled={!canNavigatePrevious}
      onclick={() => setMonth(addMonths(displayMonth, -1))}
    >
      <CaretLeft class="rdp-chevron" size={16} aria-hidden="true" />
    </button>
    <button
      type="button"
      class={cn('rdp-button_next', classNames?.button_next)}
      aria-label="Next month"
      disabled={!canNavigateNext}
      onclick={() => setMonth(addMonths(displayMonth, 1))}
    >
      <CaretRight class="rdp-chevron" size={16} aria-hidden="true" />
    </button>
  </div>
  {/if}

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
