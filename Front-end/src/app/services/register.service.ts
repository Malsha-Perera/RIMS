import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private _http:HttpClient) { }

  submitRegister(body:any){
    return this._http.post('http://localhost:3000/register/reg',body,{
      observe:'body',
     
    })
  }

  login(body:any){
    return this._http.post('http://localhost:3000/register/log',body,{
      observe:'body'
    })
  }

  getUsername(){
    return this._http.get('http://localhost:3000/register/username',{
      observe:'body',
      params:new HttpParams().append('token',localStorage.getItem('token'))
    })
  }

}
