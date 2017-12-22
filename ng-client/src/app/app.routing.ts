import {Routes} from '@angular/router';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AppComponent} from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'recipes/:id', component: RecipeDetailsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},

  // {path: 'profile', component: AuthenticationComponent},
  {path: '**', redirectTo:''}
];
