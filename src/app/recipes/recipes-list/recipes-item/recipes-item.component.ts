import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe:Recipe

  constructor(private recipeservice:RecipeService) { }

  ngOnInit() {
  }

  itemClicked(){
    this.recipeservice.RecipeSelected.emit(this.recipe)
  }

}
