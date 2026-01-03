import type { AnyFilters, CPUFilters } from '@/types/filters';
import type { Product, CpuProduct } from '@/types';
import removeDuplicates from './removeDuplicates';
import { slugifyString } from './slugify-query';

export function getFilteredCPU(products: CpuProduct[], filters: AnyFilters) {
  let result: Product[] = [];
  if (filters.line && filters.line.length > 0) {
    result.push(...filterCPUByFilterKey(products, 'line', filters.line));
  }

  if (filters.socket && filters.socket.length > 0) {
    result.push(...filterCPUByFilterKey(products, 'socket', filters.socket));
  }

  if (filters.core && filters.core.length > 0) {
    result.push(...filterCPUByFilterKey(products, 'core', filters.core));
  }

  result = removeDuplicates(result);
  return result;
}

function filterCPUByFilterKey(cpus: CpuProduct[], key: keyof CPUFilters, values: string[]): CpuProduct[] {
  return cpus.filter((cpu) => {
    const rawKey = slugifyString(cpu[key]).toUpperCase(); // 'Golden Cove' => 'GOLDEN-COVE'
    return values.map((value) => value.toUpperCase()).includes(rawKey);
  });
}
