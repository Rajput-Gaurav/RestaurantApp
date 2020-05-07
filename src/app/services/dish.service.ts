import { Injectable } from '@angular/core';
import { Dish} from '../shared/dish';

//import dishes and use as a service and export dishes as a service:
import { DISHES} from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  }

}
