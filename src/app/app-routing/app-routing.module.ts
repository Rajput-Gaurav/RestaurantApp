import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import ROuterModule and Routes:
import { RouterModule, Routes} from '@angular/router';

// import the routes from routes.ts file where we are set all the routing path:
import { routes } from './routes';
@NgModule({

  imports: [
              CommonModule,
              RouterModule.forRoot(routes)
          ],

  exports: [RouterModule],          
  declarations: []
})
export class AppRoutingModule { }
