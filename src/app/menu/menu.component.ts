import { Component, OnInit, Inject } from '@angular/core';

//import the Dish class which we are created inside shared folder:
import { Dish } from '../shared/dish';

//use a service: import the services
import { DishService} from '../services/dish.service';
// import { baseURL } from '../shared/baseurl';

  
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
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
