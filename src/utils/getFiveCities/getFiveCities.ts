import { CityData } from "../../interfaces/cityData";
import { httpRequest } from "./httpRequest";

export const getFiveCities = async (cities: string[], limit?: number) => {

    
    const promises = limit && !isNaN(limit) ? 
    cities.map((city) => httpRequest<CityData[]>(`city?city=${city}&limit=${limit}`)) :
    cities.map((city) => httpRequest<CityData[]>(`city?city=${city}&limit=3`))
    

    const data = await Promise.allSettled(promises)
    
    return data
}
