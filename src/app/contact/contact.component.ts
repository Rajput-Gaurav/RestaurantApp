// import viewchild from angular/core:
import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { flyInOut, expand } from '../animations/app.animation';

import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  // add scss file:
  styleUrls: ['./contact.component.scss'],

  host:  {
          '[@flyInOut]': 'true',
          'style': 'display: block;'
        },
  animations:[ flyInOut(), expand() ]        
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedbacks: Feedback;

  feedback : FeedbackService;
  feedbackcopy: FeedbackService;
  contactType = ContactType;
  errMess :string;
  // use viewchild too access the form template:
  @ViewChild('fform') feedbackFormDirective;

  // add objects for formError:
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  // add custom validations:
  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
              private feedbackService :FeedbackService,) {
    this.createForm();
  }

  ngOnInit() {
  }

  // apply the validation too the certain fields:
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    // add new method and use valueChanges which is Observable:
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (reset validation messages now
  }

  // add one new method onValueChanged:
  onValueChanged(data?: any) {
    if (!this.feedbackForm)
     { return; }
    const form = this.feedbackForm;
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

  // method too submit the form:
  onSubmit() {
    this.feedbacks = this.feedbackForm.value;
    console.log(this.feedbacks);

    // method too push the data too the server:
    this.feedbackService.postfeedback(this.feedbacks)
    .subscribe(
      data => console.log('Success', data),
      errmess => console.log('Error', errmess)
    )

    // method too get the data through server:
    this.feedbackService.getfeedback()
    .subscribe(feedbacks => this.feedbacks = feedbacks,
      errmess => this.errMess =<any>errmess);
      
    // when the form is submitted then filled data will be reset:
    this.feedbackForm.reset();

    // use feebdackDirective too completly reset the form after submiting:
    this.feedbackFormDirective.resetForm();
  }


}
