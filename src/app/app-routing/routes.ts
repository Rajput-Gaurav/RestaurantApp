// create a new file routes, for assign all the route navigation, and import this file to app-routing:
import { Routes} from '@angular/router';

// imports all the component for routing them:

import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

export const routes : Routes =[
                                {path: '', redirectTo:'/home', pathMatch:'full'},
                                {path: 'home', component:HomeComponent},
                                {path: 'menu', component:MenuComponent},
                                {path: 'about', component:AboutComponent},
                                {path: 'contact', component:ContactComponent},
                                // use route parameter:
                                { path: 'dishdetail/:id',     component: DishdetailComponent },

                            ];