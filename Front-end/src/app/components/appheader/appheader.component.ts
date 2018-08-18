import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  username = '';
  constructor(private registerService:RegisterService,private router:Router) { 
    this.registerService.getUsername()
    .subscribe(
      data=>this.username = data.toString(),
      error => this.router.navigate(['/login'])
      
    )
  }
 
  

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
