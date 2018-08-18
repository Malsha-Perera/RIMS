import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormGroup,FormControl,Validators} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm:FormGroup;
    successMessage = '';
  constructor(private _regservice:RegisterService,private router:Router,private activatedRouter:ActivatedRoute) { 
    this.loginForm = new FormGroup({
      email: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    });
  }

  ngOnInit() {
  }

  isValid(controlName){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
    this._regservice.login(this.loginForm.value)
    .subscribe(
      data=>{
        console.log(data);
        localStorage.setItem('token',data.toString());
        this.router.navigate(['/']);
      },
      error=>{
        this.successMessage = 'Username or Password is incorrect! '
      }
    );
  }
  }

  moveToRegister(){
    this.router.navigate(['../register'],{relativeTo:this.activatedRouter})
  }


}
