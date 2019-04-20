import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[]

  constructor(private recipeservice:RecipeService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipes=this.recipeservice.getRecipes()
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

}
