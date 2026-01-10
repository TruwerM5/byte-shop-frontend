import type { CPUFilters } from '@/types/filters';
import type { Product, CpuProduct } from '@/types';
import removeDuplicates from './removeDuplicates';
import { slugifyString } from './slugify-query';

export function getFilteredCPU(products: CpuProduct[], filters: CPUFilters) {
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

  if(filters.countCores && filters.countCores.length > 0) {
    result.push(...filterCPUByFilterKey(products, 'countCores', filters.countCores));
  }
  
  result = removeDuplicates(result);
  return result;
}

function filterCPUByFilterKey(cpus: CpuProduct[], key: keyof CPUFilters, values: string[]): CpuProduct[] {
  return cpus.filter((cpu) => { 
    const productValues = cpu[key]; 
    let rawKey: string | number = '';
    if(typeof productValues === 'string') {
      rawKey = slugifyString(productValues).toUpperCase(); // 'Golden Cove' => 'GOLDEN-COVE'
      return values.map((value) => value.toUpperCase()).includes(rawKey);
    }

    if(typeof productValues === 'number') {
      rawKey = productValues;
      return values.map(value => Number(value)).includes(rawKey);
    }
    
  });
}
