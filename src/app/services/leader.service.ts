import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string):Leader{
    return LEADERS.filter((leader)=>(leader.id === id))[0];
  }

  // use too get the FeaturedLeader:
  getFeaturedLeader(): Leader {
    return LEADERS.filter((Leader) => Leader.featured)[0];
  }

}
