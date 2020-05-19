import { Injectable } from '@angular/core';
import { Dish} from '../shared/dish';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

// import of and delay too use observables:
// import { of } from 'rxjs/observable/of';
// import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DishService {

  constructor(private http: HttpClient) { }

  // However, we would rather directly operate with observables.
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
}

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  
}
// adding new method on a service for get the all of dishes id:
  getDishIds(): Observable <string [] | any>{
  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
}

}
