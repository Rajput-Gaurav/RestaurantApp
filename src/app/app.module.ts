import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
//import flex-layout.
import {FlexLayoutModule} from '@angular/flex-layout';

//import MatListModule:
import { MatListModule} from '@angular/material/list';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

//import hammerjs.
import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSliderModule} from '@angular/material/slider';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//import services too use:
import { DishService} from './services/dish.service';
import { PromotionService} from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

// add approutingmodule:
import { AppRoutingModule} from './app-routing/app-routing.module';

// import HttpClientModule:
import { HttpClientModule } from '@angular/common/http';

// import baseUrl:
import { baseURL } from './shared/baseurl';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
  ],
  
  exports:[MatToolbarModule,
          MatListModule,
          MatGridListModule,
          MatCardModule,
          MatButtonModule],

          //import service in providers too available for every components:
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    ProcessHttpmsgService,
    {provide: 'BaseURL', useValue: baseURL}
  ],

  // To make this component be opened from another component, you need to declare this as an EntryComponent in the AppModule:
  entryComponents: [
                      LoginComponent
                   ],

  bootstrap: [AppComponent]
})
export class AppModule { }
