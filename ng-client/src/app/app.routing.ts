import {Routes} from '@angular/router';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';

export const routes: Routes = [
  {path: 'recipes', component: RecipeListComponent},
  {path: 'recipes/:id', component: RecipeDetailsComponent},
  {path: '**', redirectTo:''}
];
