import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageBody } from './home/home.component';
import { LandingHomePage } from './home/pages/landing-home/landinghome.component';

const routes: Routes = [
  {
    path : "",
    component : HomepageBody,
    children: [
      {
        path: "", 
        component: LandingHomePage
      }
    ]
  },
  {
    path : "auth",
    loadChildren: () => import("./modules/authentication/auth.module").then( m => m.AuthModule)
  },
  {
    path : "admin",
    loadChildren: () => import("./modules/admin/admin.module").then( m => m.AdminModules)
  },
  {
    path : "students",
    loadChildren: () => import("./modules/students/students.module").then( m => m.StudentsModules)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
