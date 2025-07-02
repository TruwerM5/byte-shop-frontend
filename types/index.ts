
export type Route = {
    id: number;
    title: string;
    href: string;
};

export type NestedRoute = {
    id: number;
    title: string;
    href: string;
    nestedRoutes: Route[];
}

export type HeaderLinks = Route | NestedRoute;
