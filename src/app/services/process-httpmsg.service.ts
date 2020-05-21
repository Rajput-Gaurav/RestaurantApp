// create this service too show the error and handel the error:

import { Injectable } from '@angular/core';

import { _throw as throwError } from 'rxjs/observable/throw';
import { HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ProcessHttpmsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any){

    let errMsg: string;

    if(error.error instanceof ErrorEvent)
    {
        errMsg =error.error.message;
    }
    else{
          errMsg = `${error.status} - ${error.statustext || ''} ${error.error}`;
        }

        return throwError(errMsg);
  }

}
