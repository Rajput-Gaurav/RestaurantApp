import { Injectable } from '@angular/core';
import { Dish} from '../shared/dish';

//import dishes and use as a service and export dishes as a service:
import { DISHES} from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  // design your services to return promises and resolve them when the results are available:
  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  getDish(id: string): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }

}
