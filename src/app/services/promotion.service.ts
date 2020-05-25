import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

// import of and delay too use observables:
// import { of } from 'rxjs/observable/of';
// import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { Observable } from 'rxjs/Observable';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class PromotionService {

  constructor(private http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgService) { }

  // However, we would rather directly operate with observables.
  // get all the data through the server:

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHttpmsgService.handleError));
}

  getPromotion(id: string): Observable<Promotion> {
    return  this.http.get<Promotion>(baseURL + 'promotions/' + id )
    .pipe(catchError(this.processHttpmsgService.handleError));
}

  getFeaturedPromotion(): Observable<Promotion> {
    return  this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(map(Promotion => Promotion[0]))
    .pipe(catchError(this.processHttpmsgService.handleError));
}

}
