import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number
  editMode = false
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService:RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param:Params)=>{
        this.id=+param['id']
        this.editMode = param['id'] != null
        this.initForm();
      }
    )
  }
  submit() {
    this.recipeService.editRecipe(this.id, this.recipeForm.value)
    this.recipeService.newRecipe.next();
  }


  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients:recipeIngredients
    })
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  deleteIngredient(index:number) {

  }
}
