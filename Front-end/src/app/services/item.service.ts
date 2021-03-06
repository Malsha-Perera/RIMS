import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  constructor(
    private http:Http
  ) { }


  getItems(){
    return this.http.get('http://localhost:3000/sales/item').map(res=>res.json());
    
  }

  getItemId(id){
    return this.http.get('http://localhost:3000/sales/item/'+id).map(res=>res.json());
  }

  addItem(newItem){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/sales/item',newItem,{headers:headers}).map(res=>res.json());
  }
  deleteItems(id){
    return this.http.delete('http://localhost:3000/sales/item/'+id).map(res=>res.json());
  }
  updateItems(newItem){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/sales/item/'+newItem._id,newItem,{headers:headers}).map(res=>res.json());
  }

  addCustomer(newCustomer){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/sales/custom',newCustomer,{headers:headers}).map(res=>res.json());
    
  }


  getInvoice(){
    return this.http.get('http://localhost:3000/sales/invoice').map(res=>res.json());
    
  }


  addInvoice(newInvoice){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/sales/invoice',newInvoice,{headers:headers}).map(res=>res.json());
  }
  deleteInvoice(id){
    return this.http.delete('http://localhost:3000/sales/invoice/'+id).map(res=>res.json());
  }
  updateInvoice(newInvoice){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/sales/invoice/'+newInvoice._id,newInvoice,{headers:headers}).map(res=>res.json());
  }

}
