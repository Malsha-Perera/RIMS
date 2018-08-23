import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Item } from '../models/item-detail.model';

@Injectable()
export class GrnService {

  selectedItem: Item;
  oldItems: Item[];
  sortItems: Item[];

  readonly baseURL = 'http://localhost:3000/items';
  readonly issueBaseURL = 'http://localhost:3000/items/issuing';
  readonly issueBaseURL1 = 'http://localhost:3000/items/issuing/issuing';
  readonly editROLBaseURL = 'http://localhost:3000/items/editRol';


  constructor(private http: Http) { }

  getgrn() {
    return this.http.get('http://localhost:3000/api/g/grn').map(res => res.json());
  }
  addgrn(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/g/grn', newItem, {headers: headers}).map(res => res.json());
  }
  deletegrn(id) {
    return this.http.delete('http://localhost:3000/api/g/grn/' + id)
      .map(res => res.json());
  }
  updategrn(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/g/grn/' + newItem._id, newItem, {headers: headers}).map(res => res.json());


  }
  postItem(item: Item) {
    return this.http.post(this.baseURL, item);
  }
  addProductItem(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item', newItem, {headers: headers}).map(res => res.json());
  }
  getProductItems() {
    return this.http.get('http://localhost:3000/api/items').map(res => res.json());
  }
}

