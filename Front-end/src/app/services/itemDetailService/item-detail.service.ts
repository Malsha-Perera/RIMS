import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Item } from '../../models/item-detail.model';
import { IssueItem } from '../../models/issueItem';

@Injectable()
export class ItemDetailService {

  selectedItem: Item;
  oldItems: Item[];
  sortItems: Item[];
  issueItems: IssueItem;
  readonly baseURL = 'http://localhost:3000/items';
  readonly issueBaseURL = 'http://localhost:3000/items/issuing';
  readonly issueBaseURL1 = 'http://localhost:3000/items/issuing/issuing';
  readonly editROLBaseURL = 'http://localhost:3000/items/editRol';

  constructor(private http: HttpClient) { }

  postItem(item: Item) {
    return this.http.post(this.baseURL, item);
  }

  getItemList() {
    return this.http.get(this.baseURL);
  }

  putItem(item: Item) {
    return this.http.put(this.baseURL + `/${item._id}`, item);
  }

  editROL(itemCode: string, newROL: number) {

    return this.http.put(this.editROLBaseURL + `/${itemCode}`, {newRol: newROL});
  }

  deleteItemDetail(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  sortItem() {
    this.getItemList().subscribe((res) => {
      this.oldItems = res as Item[];
    });
  }

  postIssueItem(issuedItem) {
    return this.http.post(this.issueBaseURL, issuedItem);
  }

  getIssuedItems() {
    return this.http.get(this.issueBaseURL1);
  }

  putIssueItem(issueItem) {
    return this.http.put(this.issueBaseURL + `/${issueItem.itemCode}`, issueItem);
  }
}
