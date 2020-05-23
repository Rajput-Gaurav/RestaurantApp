import { Component, OnInit, Inject } from '@angular/core';

//import the Dish class which we are created inside shared folder:
import { Dish } from '../shared/dish';

//use a service: import the services
import { DishService} from '../services/dish.service';

// import animation class:
import { flyInOut, expand } from '../animations/app.animation';
  
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(), expand()
    ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  //inject the services in constructor:
  constructor(private dishService: DishService,
    @Inject ('BaseURL') private BaseURL) { }



  ngOnInit() {
    //use for fetch the services:
    // use this method too get the data through promises:
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess =<any>errmess);
  }

}
