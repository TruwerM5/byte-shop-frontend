import type { AnyFilters, CPUFiltersKey } from '@/types/filters';

export default {
  price_min: '',
  price_max: '',
  line: [],
  socket: [],
  core: [],
  countCores: [],
  'cpu-manufacturer': [],
  capacity: [],
} satisfies AnyFilters;

export const CPUFilterKeys: CPUFiltersKey[] = ['line', 'core', 'socket', 'countCores'];