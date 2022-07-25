import express, { Express, Response } from 'express'
import dotenv from 'dotenv'
import { getCoordinates, getCurrentWeather } from './utils/openWeather/openWeatherApi'
import { getBusinesses } from './utils/yelpFusion/yelpFusionApi'
import { getFiveCities } from './utils/getFiveCities/getFiveCities';
import { TypedRequestQuery } from './interfaces/typedRequestQuery';

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT
const APIKEY = process.env.APIKEY
const APIKEYYELP = process.env.APIKEYYELP

app.get('/city', async ({ query: { city, limit, categories } }: TypedRequestQuery<{ city: string, limit: string, categories: string }>, res: Response) => {
    if(APIKEY && APIKEYYELP) {
      const coordinates = await getCoordinates(city, APIKEY)
      
      if (!coordinates) {
        return res.status(404).json({error: 404, message: "Not valid city"})
      }
      const { weather, main, error} = await getCurrentWeather({lat: coordinates.lat, lon: coordinates.lon}, APIKEY)
      if (!weather) {
        return res.status(400).json(error)
      }
      const { businesses, apiError} = await getBusinesses(city, APIKEYYELP, limit as unknown as number, categories)
      if (!businesses) {
        return res.status(400).json(apiError?.error)
      }
      return res.status(200).json({ name: city, description: weather[0].description , temp: main.temp, businesses })
    }
});

app.get('/cities', 
async ({ query: { city, limit } }: TypedRequestQuery<{ city: string[], limit: string }>, res: Response) => {
  if (city?.length != 5 ) {
    return res.status(400).send({error: 400, message: "BAD REQUEST", description: "Can get only five cities"}) 
  }

  const fiveCities = await getFiveCities(city, +limit)
  console.log(fiveCities);

  const data = fiveCities.map((city) => {
    if(city.status === 'fulfilled') return city.value.data
  })
  
  res.status(200).send(data)
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`)
});