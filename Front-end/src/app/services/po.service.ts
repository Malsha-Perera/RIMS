import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  constructor(private http: Http) { }
  getPo() {
    return this.http.get('http://localhost:3000/api/p/po').map(res => res.json());
  }

  createPo(newPo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/p/po', newPo, {headers: headers}).map(res => res.json());
  }
  addProductItem(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/pi/item', newItem, {headers: headers}).map(res => res.json());
  }

  getProductItems() {
    return this.http.get('http://localhost:3000/api/pi/items').map(res => res.json());
  }
  deleteproduct(id) {
    return this.http.delete('http://localhost:3000/api/pi/item/' + id)
      .map(res => res.json());
  }
}
