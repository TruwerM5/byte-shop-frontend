import { CPU, Product } from '@/types';

function getCPUInfo(cpu: CPU) {
    return `${cpu.socket}, ${cpu.countCores} cores`;
}

export default function getProductInfo(product: Product) {
    switch (product.category) {
        case 'cpu':
    }
}
