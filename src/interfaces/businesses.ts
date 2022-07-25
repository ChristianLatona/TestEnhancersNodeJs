import { BusinessError } from "./businessError";

export interface Category {
    alias: string;
    title: string;
}

export interface Location {
    address1: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
}

export interface Business {
    name: string;
    image_url: string;
    is_closed: boolean;
    url: string;
    review_count: number;
    categories: Category[];
    rating: number;
    location: Location;
    phone: string;
    price: string;
}

export interface Businesses {
    businesses: Business[];
    apiError: BusinessError
}