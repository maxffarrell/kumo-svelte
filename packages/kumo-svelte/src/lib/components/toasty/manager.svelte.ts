import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils/cn';

const TOAST_CONTEXT = 'kumo-toast-manager';

export type KumoToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

function nextFrame(callback: () => void) {
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(callback);
    return;
  }

  setTimeout(callback, 0);
}

export interface KumoToastAction {
  children: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline';
  onClick?: () => void;
}

export interface KumoToastOptions<Data extends object = Record<string, unknown>> {
  id?: string;
  title?: string;
  description?: string;
  variant?: KumoToastVariant;
  content?: Snippet;
  actions?: KumoToastAction[];
  timeout?: number;
  bump?: boolean;
  data?: Data;
}

export interface KumoToastObject<Data extends object = Record<string, unknown>>
  extends KumoToastOptions<Data> {
  id: string;
  transitionStatus?: 'starting' | 'active' | 'ending';
}

export type KumoToastManagerUpdateOptions<Data extends object = Record<string, unknown>> = Partial<
  KumoToastOptions<Data> & Pick<KumoToastObject<Data>, 'transitionStatus'>
>;

export class KumoToastManager {
  toasts = $state<KumoToastObject[]>([]);
  #timeouts = new Map<string, ReturnType<typeof setTimeout>>();
  #removalTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

  add(options: KumoToastOptions = {}) {
    const id = options.id ?? this.#createId();

    if (options.id) {
      const existingToast = this.toasts.find((toast) => toast.id === options.id);
      if (existingToast) {
        if (existingToast.transitionStatus === 'ending') return id;

        this.update(id, { bump: false });
        nextFrame(() => {
          this.update(id, {
            ...options,
            bump: true,
            transitionStatus: 'active'
          });
        });
        return id;
      }
    }

    const toast: KumoToastObject = {
      variant: 'default',
      timeout: 5000,
      ...options,
      transitionStatus: 'starting',
      id
    };

    this.toasts = [toast, ...this.toasts].slice(0, 6);
    this.#scheduleRemoval(toast);
    nextFrame(() => {
      this.update(id, { transitionStatus: 'active' });
    });
    return id;
  }

  update(
    id: string,
    options:
      | KumoToastManagerUpdateOptions
      | ((toast: KumoToastObject) => KumoToastManagerUpdateOptions)
  ) {
    let resolvedOptions: KumoToastManagerUpdateOptions | undefined;
    this.toasts = this.toasts.map((toast) => {
      if (toast.id !== id) return toast;
      resolvedOptions = typeof options === 'function' ? options(toast) : options;
      return { ...toast, ...resolvedOptions };
    });
    const toast = this.toasts.find((item) => item.id === id);
    if (
      toast &&
      resolvedOptions &&
      ('timeout' in resolvedOptions ||
        'title' in resolvedOptions ||
        'description' in resolvedOptions ||
        'content' in resolvedOptions)
    ) {
      this.#scheduleRemoval(toast);
    }
  }

  remove(id: string) {
    this.#clearRemoval(id);
    const toast = this.toasts.find((item) => item.id === id);
    if (!toast) return;

    if (toast.transitionStatus !== 'ending') {
      this.update(id, { transitionStatus: 'ending' });
    }

    this.#clearLocalRemoval(id);
    this.#removalTimeouts.set(
      id,
      setTimeout(() => this.#deleteLocal(id), 500)
    );
  }

  promise<T>(
    promise: Promise<T>,
    options: {
      loading: KumoToastOptions;
      success: KumoToastOptions | ((data: T) => KumoToastOptions);
      error: KumoToastOptions | ((error: Error) => KumoToastOptions);
    }
  ) {
    const id = this.add({ timeout: 0, ...options.loading });

    promise.then(
      (data) => {
        const success = typeof options.success === 'function' ? options.success(data) : options.success;
        this.update(id, { timeout: 5000, variant: 'success', ...success });
      },
      (error: Error) => {
        const failed = typeof options.error === 'function' ? options.error(error) : options.error;
        this.update(id, { timeout: 5000, variant: 'error', ...failed });
      }
    );

    return id;
  }

  #scheduleRemoval(toast: KumoToastObject) {
    this.#clearRemoval(toast.id);
    if (toast.timeout === 0) return;

    this.#timeouts.set(
      toast.id,
      setTimeout(() => this.remove(toast.id), toast.timeout ?? 5000)
    );
  }

  #clearRemoval(id: string) {
    const timeout = this.#timeouts.get(id);
    if (timeout) clearTimeout(timeout);
    this.#timeouts.delete(id);
  }

  #clearLocalRemoval(id: string) {
    const timeout = this.#removalTimeouts.get(id);
    if (timeout) clearTimeout(timeout);
    this.#removalTimeouts.delete(id);
  }

  #deleteLocal(id: string) {
    this.#clearLocalRemoval(id);
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  #createId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

const TOAST_VARIANT_CLASSES: Record<KumoToastVariant, string> = {
  default: 'border-kumo-fill bg-kumo-base',
  success:
    'ring-[0.3px] ring-kumo-success bg-kumo-base [&_[data-toast-icon]]:text-kumo-success [&_[data-toast-title]]:text-kumo-success',
  error:
    'ring-[0.3px] ring-kumo-danger bg-kumo-base [&_[data-toast-icon]]:text-kumo-danger [&_[data-toast-title]]:text-kumo-danger',
  warning:
    'ring-[0.3px] ring-kumo-warning bg-kumo-base [&_[data-toast-icon]]:text-kumo-warning [&_[data-toast-title]]:text-kumo-warning',
  info:
    'ring-[0.3px] ring-kumo-info bg-kumo-control [&_[data-toast-icon]]:text-kumo-info [&_[data-toast-title]]:text-kumo-info'
};

export function toastRootClass(variant: KumoToastVariant = 'default') {
  return cn(
    'overflow-hidden rounded-xl ring ring-kumo-line bg-clip-padding p-4 text-kumo-default shadow-lg',
    TOAST_VARIANT_CLASSES[variant]
  );
}

export function createKumoToastManager() {
  return new KumoToastManager();
}

export function setKumoToastManager(manager: () => KumoToastManager) {
  setContext(TOAST_CONTEXT, manager);
}

export function useKumoToastManager() {
  const manager = getContext<(() => KumoToastManager) | undefined>(TOAST_CONTEXT);
  if (!manager) {
    throw new Error('useKumoToastManager must be called inside a Toasty component.');
  }
  return manager();
}
