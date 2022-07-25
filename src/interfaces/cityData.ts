import { Business } from "./businesses";


export interface CityData {
    name: string;
    description: string;
    temp: number;
    businesses: Business[];
}