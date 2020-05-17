import { Component, OnInit } from '@angular/core';

//import the Dish class which we are created inside shared folder:
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';

//use a service: import the services
import { DishService} from '../services/dish.service';

  
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //create a variable for assigning Dish:
  // dishes: Dish[] = DISHES;

  dishes: Dish[];

  selectedDish: Dish;

  //inject the services in constructor:
  constructor(private dishService: DishService) { }

  // constructor() { }

  ngOnInit() {
    //use for fetch the services:
    // use this method too get the data through promises:
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
