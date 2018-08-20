import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class InvoiceService {

  constructor(
    private http:Http
  ) { }

  
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
