import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  providers: [RecipesService]
})
export class RecipeDetailsComponent implements OnInit {
  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.getRecipeDetails(params['id']);
   });
 }

 getRecipeDetails(id) {
     this.recipesService.get(id)
       .subscribe((recipe) => {
         console.log("RES = ", recipe);
         this.recipe = recipe;
       });
   }


  }
