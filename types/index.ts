

export type NestedRoute = {
    id: number;
    parentId: number;
    title: string;
    href: string;
};

export type Route =
    | {
          id: number;
          title: string;
          href: string;
          nestedRoutes?: never;
      }
    | {
          id: number;
          title: string | SVGAElement;
          href: string;
          nestedRoutes: NestedRoute[];
      };

export type AbstractProduct = {
    id: number | string;
    category: Categories;
    name: string;
    manufacturer: string;
    brand: string;
    price: number;
    images: string[];
    warrantyMonths: number;
    popularity: number;
    slug: string;
    inStock: boolean;
    reviews?: string[];
    color?: string;
    sizes?: string;
};

export type CPU = AbstractProduct & {
    socket: string;
    architecture: string;
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
};

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
};

export type Product = CPU | GraphicsCard;

export enum Categories {
    cpu = 'cpu',
    graphicsCards = 'graphics-cards',
    ram = 'ram',
    cases = 'cases',
    motherboards = 'motherboards',
    periphery = 'periphery'
}