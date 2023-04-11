import { ForbiddenException, Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { CheckRateDto } from './dto/check-rate.dto';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';

interface DelyvaDataRespone {
  price: {
      amount: number,
      currency: string
  },
  weight: {
      value: number,
      unit: string,
  },
  distance: {
      value: number,
      unit: string
  },
  service: {
      name: string,
  },
}

@Injectable()
@UseInterceptors(CacheInterceptor)
export class CheckRatesService {
  constructor(
    @Inject(CACHE_MANAGER) 
    private cacheManager: Cache,
    private readonly httpService: HttpService
  ){}

  getRates(
    checkRateDto : CheckRateDto,
    accessToken : string
  ) {

    return this.cacheManager
    .get(`${accessToken}_instaQuote`)
    .then( async (cachedData) =>{
      if ( cachedData ){
        return cachedData
      }

      // call the api to get the data
      const data = {
        companyId:process.env.delvya_company_id,
        customerId:process.env.delvya_customer_id,
        origin:{
          address1:checkRateDto.originAddress1,
          address2:checkRateDto.originAddress2,
          city:checkRateDto.originCity,
          state:checkRateDto.originState,
          postcode:checkRateDto.originPostcode,
          country:"MY"
        },
        destination:{
          address1:checkRateDto.destinationAddress1,
          address2:checkRateDto.destinationAddress2,
          city:checkRateDto.destinationCity,
          state:checkRateDto.destinationState,
          postcode:checkRateDto.destinationPostcode,
          country:"MY"
        },
        itemType:"PARCEL",
        weight:{
          unit:"kg",
          value:checkRateDto.packageWeight
        }
      }

      const rates = await this.httpService
      .post(
        'https://api.delyva.app/v1.0/service/instantQuote/',
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .pipe(map((res:AxiosResponse)=> {
        const respone : DelyvaDataRespone[] = res.data.data.services
        return respone.map((data: DelyvaDataRespone) => {
          return {
            courier:data.service.name,
            rate:+data.price.amount
          }
        })
      }))
      .pipe(catchError((err) => {
        console.error(err)
        throw new ForbiddenException('API not available');
      }),)

      await this.cacheManager.set(
        `${accessToken}_instaQuote`,
        rates,
        10000, //10 second , milisecond unit
      )

      return rates;
    })

    


  }
}
