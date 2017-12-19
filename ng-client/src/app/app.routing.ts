import {Routes} from '@angular/router';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {AuthenticationComponent} from './authentication/authentication.component'

export const routes: Routes = [
  {path: '', component: RecipeListComponent},
  {path: 'recipes/:id', component: RecipeDetailsComponent},
  {path: 'profile', component: AuthenticationComponent},
  {path: '**', redirectTo:''}
];
