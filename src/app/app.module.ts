import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';   // mat form component
import { MatFormFieldModule } from '@angular/material/form-field';  // mat form 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor.service';
import { SharedModule } from './modules/sharedmodules/shared.module';
import { HomepageBody } from './home/home.component';
import { HomeBannerComponent } from './home/components/home-banner/homeBanner.component';
import { CourseComponent } from './home/components/courses/courses.component';
import { InstructorsComponent } from './home/components/instructors/instructors.component';
import { LandingHomePage } from './home/pages/landing-home/landinghome.component';
import { LoggedRole } from './services/role.service';
import { AdminModules } from './modules/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageBody,
    HomeBannerComponent,
    CourseComponent,
    InstructorsComponent,
    LandingHomePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    SharedModule,
    AdminModules,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoggedRole
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
