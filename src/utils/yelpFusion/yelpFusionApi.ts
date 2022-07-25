import { Businesses } from "../../interfaces/businesses";
import { httpRequest } from "./httpRequest";

export const getBusinesses = async (location: string, apiKey: string, limit: number, categories?: string) => {

    const {data} = await httpRequest<Businesses>(
        `/businesses/search?location=${location}&limit=${limit}&categories=${categories}`, 
        { headers: { Authorization: `Bearer ${apiKey}` } }
    )

    const responseBusinesses: Businesses = {
        ...data, 
        businesses: data.businesses.map((business)=>({
            name: business.name, 
            image_url: business.image_url,
            is_closed: business.is_closed,
            url: business.url,
            review_count: business.review_count,
            categories: business.categories,
            rating: business.rating,
            location: {
                address1: business.location.address1,
                city: business.location.city,
                zip_code: business.location.zip_code,
                country: business.location.country,
                state: business.location.state,
            },
            phone: business.phone,
            price: business.price
        }))
    }

    return responseBusinesses
}