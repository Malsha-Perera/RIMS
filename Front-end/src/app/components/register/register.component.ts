import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormGroup,FormControl,Validators} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  successMessage = '';
  constructor(private _regservice:RegisterService,private router:Router,
  private activatedRouter:ActivatedRoute) {
    this.myForm = new FormGroup({
      email:new FormControl(null,Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null,Validators.required),
      cnfpass:new FormControl(null,this.passValidator)
    });
    this.myForm.controls.password.valueChanges
    .subscribe(
      x=>this.myForm.controls.cnfpass.updateValueAndValidity()
    );
   }

  ngOnInit() {
  }

  isValid(controlName){
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control:AbstractControl){
    if(control && (control.value !==null || control.value !==undefined)){
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if(passControl){
        const passValue = passControl.value;
        if(passValue !==cnfpassValue || passValue ===''){
          return {
            isError:true
          };
        }
      }
    }
    return null;
  }

  register(){
    console.log(this.myForm.value);

    if(this.myForm.valid){
    this._regservice.submitRegister(this.myForm.value)
    .subscribe(
      data => {this.successMessage = 'Registration Success'
      Swal({
        position: 'top',
        title: 'Registration is succesfully added!',
        type: 'success',
        text: '',
        
        
      });
      this.router.navigate(['/login']);
    },
      error => {this.successMessage = 'Registration Not Success'
      Swal({
        title: 'Registration is Not success!',
        type: 'warning',
        text: '',
        
        
      });
    }
    );
  }
  }

  moveToLogin(){
    this.router.navigate(['../login'],{relativeTo:this.activatedRouter})
  }

}
