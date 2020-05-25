import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

// import of and delay too use observables:

import { Observable } from 'rxjs/Observable';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class LeaderService {

  constructor( private http: HttpClient,
    private processHttpmsgService: ProcessHttpmsgService) { }

  
  // However, we would rather directly operate with observables.
  // get all the data through the server:

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHttpmsgService.handleError));
}

  getLeader(id: number): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id )
    .pipe(catchError(this.processHttpmsgService.handleError));
}

  // use too get the FeaturedLeader:
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
    .pipe(map(Leader => Leader[0]))
    .pipe(catchError(this.processHttpmsgService.handleError));
}

}
