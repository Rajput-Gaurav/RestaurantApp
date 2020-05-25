import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';

import { map , catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { Observable } from 'rxjs/Observable';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class FeedbackService {

  constructor(private http: HttpClient, 
              private processHttpmsgService: ProcessHttpmsgService) { }

  // addfeedback(feedback : Feedback): Observable<Feedback> {
  //   return this.http.post<Feedback>(baseURL, feedback)
  //   .pipe(catchError(this.processHttpmsgService.handleError));
  // }

  // putFeedback(feedback :Feedback): Observable<Feedback>{
  //   const httpOptions ={
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   return this.http.put<Feedback>(baseURL + 'feedback' + feedback, httpOptions)
  //   .pipe(catchError(this.processHttpmsgService.handleError));
  // }

  // method too post the data too the server:
  postfeedback(feedback : Feedback) {
    return this.http.post<any>(baseURL + 'feedback/', feedback)
    .pipe(catchError(this.processHttpmsgService.handleError));
  }

  // method too get the data through the server:
  getfeedback(): Observable<Feedback>{
    return this.http.get<Feedback>(baseURL + 'feedback')
    .pipe(catchError(this.processHttpmsgService.handleError));
  }

}
