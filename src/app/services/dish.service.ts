import { Injectable } from '@angular/core';
import { Dish} from '../shared/dish';

//import dishes and use as a service and export dishes as a service:
import { DISHES} from '../shared/dishes';

// import of and delay too use observables:
// import { of } from 'rxjs/observable/of';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DishService {

  constructor() { }

  // However, we would rather directly operate with observables.
  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
}

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  
}
// adding new method on a service for get the all of dishes id:
  getDishIds(): Observable <string [] | any>{
  return of(DISHES.map(dish => dish.id));
}

}
