import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

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

}
