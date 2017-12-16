import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipesService]
})
export class RecipeListComponent implements OnInit {
  recipes
  constructor(private recipe: RecipesService) { }

  ngOnInit() {
    this.recipe.getList()
      .subscribe((recipes) =>{
        this.recipes = recipes;
      })

      // this.user.getList()
      // .subscribe((user) => {
      //   this.users = users;
      // })

  }

}
