export const filterList = [
    {
        slug: 'cpu',
        filters: [
            {
                id: 1,
                title: 'Line',
                values: [
                'Core i5',
                'Core i7',
                'Core i9',
                'AMD Ryzen 5',
                'AMD Ryzen 7',
                'AMD Ryzen 9',
                ]
            },
            {
                id: 2,
                title: 'Socket',
                values: [
                    'AM4',
                    'AM5',
                    'LGA 1200',
                    'LGA 1700',
                    'LGA 1851',
                ]
            }
        ],
    },
    {
        slug: 'graphics-cards',
        filters: [
            {
                id: 3,
                title: 'CPU Manufacturer',
                values: [
                    'AMD',
                    'Intel',
                    'NVIDIA',
                ]
            }
        ]
    }
];