import { Component, OnInit } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  leader: Leader[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {

    // use this method too get the data through promises:
    
     this.leaderService.getLeaders()
    .subscribe(leader => this.leader = leader);
  }

}
