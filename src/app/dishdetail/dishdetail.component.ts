import { Component, OnInit, Inject} from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import switchMap:
import { switchMap } from 'rxjs/operators';
import { Review } from '../shared/review';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  // add scss file:
  styleUrls: ['./dishdetail.component.scss']

  
})

export class DishdetailComponent implements OnInit {

  commentForm : FormGroup;
  review: Review;

  dish: Dish;
  // create a new variables for take id and prev and next:
  dishIds: string[];
  prev: string;
  next: string;

   // add objects for formError:
   formErrors = {
    'name': '',
    'rating': '',
    'comment': '',
  };

    // add custom validations:
    validationMessages = {
      'name': {
        'required': 'Name is required.',
        'minlength': 'Name must be at least 2 characters long.',
        'maxlength': 'Name cannot be more than 25 characters long.'
      },
      'comment': {
        'required': 'comment is required.',
      },
    };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private formbuilder: FormBuilder,
    @Inject ('BaseURL') private BaseURL) { 

      this.createForm();
    }

  ngOnInit() {
    // method for when the dishes are changed then show them:
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

    // use this method too get the id of dishes:
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
    
  }

  // add method too submit the comment:
  onSubmit() {
    this.review = this.commentForm.value;
    console.log(this.review);
    // when the form is submitted then filled data will be reset:
    this.commentForm.reset();
  }

  // below the ngOnInit add method:
  createForm(){
    this.commentForm =this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]],
    });

     // add new method and use valueChanges which is Observable:
     this.commentForm.valueChanges
     .subscribe(data => this.onValueChanged(data));

   this.onValueChanged(); // (reset validation messages now
  }

    // add one new method onValueChanged:
    onValueChanged(data?: any) {
      if (!this.commentForm)
       { return; }
      const form = this.commentForm;
      for (const field in this.formErrors)
       { if (this.formErrors.hasOwnProperty(field))
         { // clear previous error message (if any) 
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

  // add new method for prev and next:
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  // back method too back from the dishdetail dish to menu:
  goBack(): void {
    this.location.back();
  }

}
