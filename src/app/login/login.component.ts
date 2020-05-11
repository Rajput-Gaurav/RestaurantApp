import { Component, OnInit } from '@angular/core';

// To make this component into a Dialog component, open login.component.ts and import MatDialog and MatDialogRef as follows:
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
