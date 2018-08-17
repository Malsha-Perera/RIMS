
import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

import { RecipieService } from '../../services/recipie.service';
import { Recipie } from '../../models/recipie';
import {Globals} from '../../globals/globals';


@Component({
  selector: 'app-add-recipie',
  templateUrl: './add-recipie.component.html',
  styleUrls: ['./add-recipie.component.css'],
  providers:[RecipieService],
})
export class AddRecipieComponent implements OnInit {

  public modalRef: BsModalRef;
  searchText = '';
  recipieList: Recipie[]=[];
  newRecipieList: Recipie[]=[];
  newRecipies:Recipie[]=[];
  alerts: any[] = [];
  selectedRecipie:Recipie;
  recipieCode: String;
  productName: String;
  ingredient: [{}];
  quantity:[{}];
  unitCost:[{}];
  

  constructor(public recipieService: RecipieService, public modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    console.log("oninit");
    this.refreshRecipieList();
    
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' }); // {3}
  }
  public openSetROLModal(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2, {class: 'modal-md' }); // {3}
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  closeSetROLModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.recipieService.addRecipe(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshRecipieList();
      });
    } else {
      this.recipieService.updateRecipe(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshRecipieList();
      });
    }
  }

  
         
  
  

 public refreshRecipieList() {
   this.recipieCode = Globals.recipeCode;
   this.productName = Globals.productName;
    this.recipieService.getRecipeFromCode(Globals.recipeCode).subscribe((res) => {
      
      this.recipieList = res as Recipie[];
      localStorage.setItem("recipieKey",JSON.stringify(this.recipieList));
      console.log(this.recipieList);
      this.getArrays();
      console.log(this.ingredient);
      console.log(this.quantity);
      
    });   

    
  }

  public getArrays(){
    this.newRecipieList= JSON.parse(localStorage.getItem("recipieKey"));
    console.log(this.newRecipieList);
    for (var i=0; i<this.newRecipieList.length; i++){
      if (this.newRecipieList[i].recipieCode == Globals.recipeCode){
        this.ingredient = this.newRecipieList[i].ingredient;
        this.quantity =this.newRecipieList[i].quantity;
        this.unitCost = this.newRecipieList[i].unitCost;
        break;
      }
    }
  }

  onEdit(Recipie:Recipie) {
    this.selectedRecipie = Recipie;
  }

  

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are You Sure to delete this record ?') === true) {
      this.recipieService.deleteRecipe(_id).subscribe((res) => {
        this.refreshRecipieList();
        this.resetForm(form);
      });
    }
  }

  resetForm(form?: NgForm) {

    if (form) {
      form.reset();
    }
    this.selectedRecipie = {
      _id:'',
      productName: '',
      recipieCode: '',      
      ingredient:[{}],
      quantity:[{}],
      unitCost:[{}],
      cost:null,
    
    };

  }

  addrecipieAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `recipie is added successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }


}
