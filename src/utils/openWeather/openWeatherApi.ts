import { Coordinates } from "../../interfaces/coordinates";
import { WeatherData } from "../../interfaces/weatherData";
import { httpRequest } from "./httpRequest";

export const getCoordinates = async (city: string, apiKey: string) => {
    const {data} = await httpRequest<Coordinates[]>(`/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    
    return data[0]
}

export const getCurrentWeather = async ({lat, lon}: Coordinates, apiKey: string) => {
    const {data} = await httpRequest<WeatherData>(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)

    return data
}