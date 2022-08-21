import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ServicesComponent } from './components/services/services.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },

  {
    path:'about',component:AboutComponent
  },
  {
    path:'services',component:ServicesComponent
  },
  {
    path:'projects',component:ProjectsComponent
  },
  {
    path:'contact',component:ContactUsComponent
  },
  // canActivate: [UserGuard],
  {
    path:'user/create_project',component:CreateProjectComponent
  },
  // canActivate: [UserGuard],

  {
    path:'page_not_found', component:ErrorComponent
  },
  {
    path:'sign_in',component:SignInComponent
  },
  {
    path:'**', redirectTo:'page_not_found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
