import { getContext, setContext } from 'svelte';

export interface PaginationLabels {
  navigation?: string;
  firstPage?: string;
  previousPage?: string;
  nextPage?: string;
  lastPage?: string;
  pageNumber?: string;
  pageSize?: string;
}

export const DEFAULT_PAGINATION_LABELS: Required<PaginationLabels> = {
  navigation: 'Pagination',
  firstPage: 'First page',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  lastPage: 'Last page',
  pageNumber: 'Page number',
  pageSize: 'Page size'
};

export interface PaginationContextValue {
  page: number;
  perPage?: number;
  totalCount?: number;
  hasNextPage?: boolean;
  maxPage: number;
  pageShowingRange: string;
  setPage: (page: number) => void;
  editingPage: number;
  setEditingPage: (page: number) => void;
  labels: Required<PaginationLabels>;
}

const PAGINATION_CONTEXT = Symbol('kumo-pagination');

export function setPaginationContext(context: PaginationContextValue) {
  setContext(PAGINATION_CONTEXT, context);
}

export function getPaginationContext() {
  const context = getContext<PaginationContextValue | undefined>(PAGINATION_CONTEXT);

  if (!context) {
    throw new Error('Pagination compound components must be used within a Pagination component');
  }

  return context;
}

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
