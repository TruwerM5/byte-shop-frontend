import type { CheckboxFilter } from '@/types/filters';

export const filterList: CheckboxFilter[] = [
  {
    type: 'checkbox',
    slug: 'cpu',
    filters: [
      {
        id: 1,
        title: 'Line',
        values: ['Core i5', 'Core i7', 'Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
        type: 'line',
      },
      {
        id: 2,
        title: 'Socket',
        values: ['AM4', 'AM5', 'LGA 1200', 'LGA 1700', 'LGA 1851'],
        type: 'socket',
      },
      {
        id: 3,
        title: 'Core',
        values: [
          'Arrow Lake-S',
          'Granite Ridge',
          'Raphael',
          'Raptor Cove',
          'Vermeer',
          'Zen',
          'Phoenix',
          'Picasso',
          'Raptor Lake',
          'Skylake-S',
          'Golden Cove',
        ],
        type: 'core',
      },
      {
        id: 4,
        title: 'Number of cores',
        values: [6, 8, 14, 16, 20],
        type: 'countCores'
      }
    ],
  },
  {
    type: 'checkbox',
    slug: 'graphics-cards',
    filters: [
      {
        id: 3,
        title: 'CPU Manufacturer',
        values: ['AMD', 'Intel', 'NVIDIA'],
        type: 'cpu-manufacturer',
      },
    ],
  },
];
