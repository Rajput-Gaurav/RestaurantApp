import { Component, OnInit} from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import switchMap:
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']

  
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  // create a new variables for take id and prev and next:
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    // method for when the dishes are changed then show them:
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

    // use this method too get the data:
    // this.dishservice.getDish(id)
    // .subscribe(dish => this.dish = dish);

    // use this method too get the id of dishes:
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
    
  }

  // add new method for prev and next:
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
