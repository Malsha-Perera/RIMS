import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
// import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

 
  constructor(private http: Http) { }

  getProducts() {
    return this.http.get('http://localhost:3000/product/').map(res => res.json());
  }

  /*
  getproductByCode(productCode) {
    return this.http.get('http://localhost:3000/product/' + productCode).map(res => res.json());
  }
  addProduct(newProduct) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/product', newProduct, {headers: headers}).map(res => res.json());
  }

  deleteProduct(id) {
    return this.http.delete('http://localhost:3000/product/' + id)
      .map(res => res.json());
  }
  updateProduct(newProduct) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/product/' + newProduct._id, newProduct, {headers: headers}).map(res => res.json());

  }*/


}
