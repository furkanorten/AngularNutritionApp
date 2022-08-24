import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NutritionDatas } from '../models/nutrition.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  constructor(private http: HttpClient) { }

  getNutritionData(query: any): Observable<NutritionDatas> {
    return this.http.get<NutritionDatas>(environment.weatherApiBaseUrl, {
      headers: new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyName, environment.XRapidAPIKeyValue),
      params: new HttpParams()
      .set('query', query)
    })
  }

}
