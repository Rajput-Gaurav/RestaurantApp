import { Component, OnInit, Inject, ViewChild} from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

// import switchMap:
import { switchMap } from 'rxjs/operators';

// import animation class:
import { visibility, flyInOut, expand } from '../animations/app.animation';

// Define a new animation trigger within the Component decorator:
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  // add scss file:
  styleUrls: ['./dishdetail.component.scss'],

  host:  {
          '[@flyInOut]': 'true',
          'style': 'display: block;'
        },
  animations: [ visibility(), flyInOut(), expand() ],

})

export class DishdetailComponent implements OnInit {

  commentForm : FormGroup;
  // add variable comment which type is Comment array:
  comment: Comment;
  @ViewChild('cform') commentFormDirective;

  dishcopy: Dish;

  dish: Dish;
  // create a new variables for take id and prev and next:
  dishIds: string[];
  prev: string;
  next: string;

  errMess: string;

  visibility = 'shown';

   // add objects for formError:
   formErrors = {
    'author': '',
    'comment': '',
  };

    // add custom validations:
    validationMessages = {
      'author': {
        'required': 'Name is required.',
        'minlength': 'Name must be at least 2 characters long.',

      },
      'comment': {
        'required': 'comment is required.',
      },
    };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private formbuilder: FormBuilder,
    @Inject ('BaseURL') private BaseURL) { }

    
  ngOnInit() {
    this.createForm();
    // method for when the dishes are changed then show them:
    // and get all the dishes in dishdetaile component:
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility= 'shown'; },
      errmess => this.errMess =<any>errmess);

    // use this method too get the id of dishes:
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
    
  }

  // add method too submit the comment:
  onSubmit() {
    this.comment =this.commentForm.value;
    this.comment.date =new Date().toISOString();
    console.log(this.comment);
    // push the data into the comment array on server using push method:
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
    .subscribe(dish => {
      this.dish = dish; this.dishcopy = dish;
    },
    errmess => { this.dish =null; this.dishcopy =null; this.errMess =<any>errmess});
    // this.commentFormDirective.resetForm();
    // when the form is submitted then filled data will be reset:
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  // below the ngOnInit add method:
  createForm(){
    this.commentForm =this.formbuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
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
