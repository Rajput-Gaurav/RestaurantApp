import { Component, OnInit } from '@angular/core';

// To make this component into a Dialog component, open login.component.ts and import MatDialog and MatDialogRef as follows:
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // add scss file and remove css file:
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // create a object of user too take the value of input fields:
  user = {username: '', password: '', remember: false};

  // in the constructor inject the DialogRef and LoginComponent depend in MatDialogRef:
  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  // call onSubmit method:
  onSubmit() {
    console.log('User: ', this.user);

    // this is used too when form is submit then dialog is closed:
    this.dialogRef.close();

}
}