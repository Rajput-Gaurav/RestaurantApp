import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

// import of and delay too use observables:
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LeaderService {

  constructor() { }

  
  // However, we would rather directly operate with observables.
  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
}

  getLeader(id: string): Observable<Leader>{
    return of(LEADERS.filter((leader)=>(leader.id === id))[0]).pipe(delay(2000));
}

  // use too get the FeaturedLeader:
  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((Leader) => Leader.featured)[0]).pipe(delay(2000));
}

}
