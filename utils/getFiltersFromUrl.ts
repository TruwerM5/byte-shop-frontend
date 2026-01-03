import type { AnyFilters, Category, CPUFiltersKey } from '@/types/filters';

const CPUFilterKeys: CPUFiltersKey[] = ['line', 'core', 'socket'];

export default function getFiltersFromUrl(searchParams: URLSearchParams, category: Category) {
  const currentKeys = getCurrentCategoryFilterKeys(category);
  if (!currentKeys) {
    throw new Error(`Category ${category} is not defined`);
  }
  const params = searchParams;
  const obj: AnyFilters = {};
  currentKeys.forEach((query) => {
    obj[query] = params.get(query)?.toString().split(',') || [];
  });

  return obj;
}

function getCurrentCategoryFilterKeys(category: Category) {
  switch (category) {
    case 'cpu':
      return CPUFilterKeys;
    default:
      return undefined;
  }
}
