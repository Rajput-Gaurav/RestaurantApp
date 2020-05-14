// import viewchild from angular/core:
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  // add scss file:
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  // use viewchild too access the form template:
  @ViewChild('fform') feedbackFormDirective;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  // apply the validation too the certain fields:
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: [0, Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  // method too submit the form:
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    // when the form is submitted then filled data will be reset:
    this.feedbackForm.reset();

    // use feebdackDirective too completly reset the form after submiting:
    this.feedbackFormDirective.resetForm();
  }


}
