import { Injectable } from '@angular/core';
import { Dish} from '../shared/dish';

import { map , catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { Observable } from 'rxjs/Observable';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private http: HttpClient,
            private processHttpmsgService: ProcessHttpmsgService) { }

  // However, we would rather directly operate with observables.
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHttpmsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHttpmsgService.handleError));
}

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHttpmsgService.handleError));
  
}
// adding new method on a service for get the all of dishes id:
  getDishIds(): Observable <string [] | any>{
  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
}

// add new method too put the data into the server:
putDish(dish: Dish): Observable<Dish> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
    .pipe(catchError(this.processHttpmsgService.handleError));

}


}
