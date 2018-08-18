import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Recipie } from '../models/recipie';
//import { Recipie } from '../components/recipie/recipie';

@Injectable()
export class RecipieService {

  

  constructor(private http: Http) { }

  getRecipes() {
    return this.http.get('http://localhost:3000/recipie/').map(res => res.json());
  }
  getRecipeFromCode(recipieCode) {
    return this.http.get('http://localhost:3000/recipie/'+recipieCode).map(res => res.json());
  }
  addRecipe(Recipie) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/recipie/', Recipie, {headers: headers}).map(res => res.json());
  }

  deleteRecipe(id) {
    return this.http.delete('http://localhost:3000/recipie/' + id)
      .map(res => res.json());
  }
  updateRecipe(newRecipie) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/recipie/' + newRecipie._id, newRecipie, {headers: headers}).map(res => res.json());



  }

}
