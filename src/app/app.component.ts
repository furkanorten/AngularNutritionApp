import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { NutritionDatas } from './models/nutrition.model';
import { NutritionService } from './services/nutrition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private nutritionService: NutritionService, private fb: FormBuilder) {}

  nutritionForm = this.fb.group(
    {
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      food: ['', [Validators.required]]
    }
  )

  nutritionDatas: NutritionDatas =
  [
    {
      name: '',
      calories: 0,
      serving_size_g: 0,
      fat_total_g: 0,
      fat_saturated_g: 0,
      protein_g: 0,
      sodium_mg: 0,
      potassium_mg: 0,
      cholesterol_mg: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0
    }
  ]

  success: boolean = false

  get control(): {[key:string]: AbstractControl} {
    return this.nutritionForm.controls
  }

  getNutritionData() {
    this.success = false
    this.nutritionDatas[0].name = ''
    this.nutritionDatas[0].calories = 0
    this.nutritionDatas[0].serving_size_g = 0
    this.nutritionDatas[0].fat_total_g = 0
    this.nutritionDatas[0].fat_saturated_g = 0
    this.nutritionDatas[0].protein_g = 0
    this.nutritionDatas[0].sodium_mg = 0
    this.nutritionDatas[0].potassium_mg = 0
    this.nutritionDatas[0].cholesterol_mg = 0
    this.nutritionDatas[0].carbohydrates_total_g = 0
    this.nutritionDatas[0].fiber_g = 0
    this.nutritionDatas[0].sugar_g = 0

    this.nutritionService.getNutritionData(this.nutritionForm.value.amount+'g ' + this.nutritionForm.value.food).subscribe(res => {
      this.nutritionDatas = res
      if(this.nutritionDatas.length == 1) {
        this.success = true
      }
      else {
        alert(this.nutritionForm.value.food + ' can not be found!')
      }
    },
    error => {
      alert(this.nutritionForm.value.food + ' can not be found!')
    })
  }

  ngOnInit(): void {
    this.success = false
  }

}
