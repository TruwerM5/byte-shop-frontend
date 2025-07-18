import { Product, Categories } from '@/types';

export const products: Product[] = [
    {
        id: 1,
        category: Categories.cpu,
        name: 'AMD Ryzen 7 7700 OEM',
        slug: 'amd-ryzen-7',
        manufacturer: 'AMD',
        brand: 'AMD',
        price: 18340,
        images: ['amd-ryzen-7-7700.webp'],
        warrantyMonths: 12,
        popularity: 4.5,
        inStock: true,
        socket: 'AM5',
        architecture: 'Zen 4',
        core: 'Raphael',
        countCores: 8,
        countStreams: 16,
        model: '7700',
        clockSpeed: 3800,
        clockSpeedTurbo: 5300,
        techProcess: 5,
        cashLOne: 64,
        tdp: 65,
        maxTemp: 95,
        dateOfRelease: 'Q3 2022',
        isWithCooler: false,
        isGraphicsIntegrated: true,
        graphicsCard: 'Radeon Graphics, RDNA 2',
        line: 'Ryzen 7',
    },
    {
        id: 2,
        category: Categories.cpu,
        name: 'Intel Core i5 - 12400 OEM',
        slug: 'intel-core-i5',
        manufacturer: 'Inntel',
        brand: 'Intel',
        price: 11390,
        images: ['intel-core-i5-12400.webp'],
        warrantyMonths: 12,
        popularity: 4.5,
        inStock: true,
        socket: 'LGA 1700',
        architecture: 'Alder Lake',
        core: 'Golden Cove',
        countCores: 6,
        countStreams: 12,
        model: '12400',
        clockSpeed: 2500,
        clockSpeedTurbo: 4400,
        techProcess: 10,
        tdp: 65,
        maxTemp: 100,
        isWithCooler: false,
        isGraphicsIntegrated: true,
        graphicsCard: 'Intel UHD Graphics 730',
        line: 'Core i5',
    },
    {
        id: 3,
        category: Categories.graphicsCards,
        name: 'NVIDIA GeForce RTX 4070 Super Gigabyte WindForce OC 12Gb',
        slug: 'nvidia',
        manufacturer: 'Gigabyte',
        brand: 'NVIDIA',
        price: 60480,
        images: [
            '4070-super-1.webp',
            '4070-super-2.webp',
            '4070-super-3.webp',
            '4070-super-4.webp',
            '4070-super-5.webp',
            '4070-super-6.webp',
        ],
        warrantyMonths: 36,
        popularity: 4.6,
        inStock: true,
        serie: 'GeForce RTX 4070 Super',
        interface: 'PCI Express 4.0',
        countSlots: 3,
        countCoolers: 3,
        connectors: 'HDMI, 3 x DisplayPort',
        architecture: 'nVidia Ada Lovelace',
        techProcess: 5,
        clockSpeed: 1980,
        clockSpeedTurbo: 2505,
        memoryCapacity: 12,
        memoryType: 'GDDR6X',
        memoryBus: 192,
        bandwidth: 504,
        videoMemoryFrequency: 21000,
        recommendedPower: 750,
    },
];
