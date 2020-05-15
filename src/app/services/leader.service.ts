import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  // design your services to return promises and resolve them when the results are available:

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader)=>(leader.id === id))[0]);
  }

  // use too get the FeaturedLeader:
  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((Leader) => Leader.featured)[0]);
  }

}
