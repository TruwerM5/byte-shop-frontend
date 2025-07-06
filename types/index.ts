
export type Route = {
    id: number;
    title: string;
    href: string;
    nestedRoutes?: never;
} | {
    id: number;
    title: string;
    nestedRoutes: Route[];
    href?: never;
};

export type NestedRoute = {
    id: number;
    title: string;
    href: string;
    
}

export type HeaderLinks = Route;

export type AbstractProduct = {
    id: number | string;
    category: string;
    name: string;
    manufacturer: string;
    brand: string;
    price: number;
    images: string[];
    warrantyMonths: number;
    popularity: number;
    slug: string;
    reviews?: string[];
    color?: string;
    sizes?: string;
};

export type CPU = AbstractProduct & {
    socket: string;
    acrhitecture: string;
    core: string;
    countCores: number;
    countStreams: number;
    model: string;
    isGraphicsIntegrated: boolean;
    clockSpeed: number;
    techProcess: number;
    maxTemp: number;
    tdp: number;
    isWithCooler: boolean;
    dateOfRelease?: Date | string;
    clockSpeedTurbo?: number;
    graphicsCard?: string;
    line?: string;
    cashLOne?: number;
    cashLTwo?: string;
    cashLThree?: string;
}

export type GraphicsCard = AbstractProduct & {
    serie: string;
    interface: string;
    countSlots: number;
    countCoolers: number;
    connectors: string;
    architecture: string;
    techProcess: number;
    clockSpeed: number;
    memoryCapacity: number;
    memoryType: string;
    memoryBus: number;
    bandwidth: number;
    videoMemoryFrequency: number;
    recommendedPower: number;
    clockSpeedTurbo?: number;
}

export type Product = CPU | GraphicsCard;