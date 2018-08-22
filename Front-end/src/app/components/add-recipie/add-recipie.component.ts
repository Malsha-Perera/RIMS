
import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

import { ItemDetailService } from '../../services/itemDetailService/item-detail.service';
import { RecipieService } from '../../services/recipie.service';
import { Recipie } from '../../models/recipie';
import { Item } from '../../models/item-detail.model';
import {Globals} from '../../globals/globals';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-recipie',
  templateUrl: './add-recipie.component.html',
  styleUrls: ['./add-recipie.component.css'],
  providers:[RecipieService,ItemDetailService],
})
export class AddRecipieComponent implements OnInit {

  public modalRef: BsModalRef;
  searchText = '';
  recipieList: Recipie[]=[];
  itemList: Item[]=[];
  allRecipieList: Recipie[]=[];
  newRecipieList: Recipie[]=[];
  newRecipieList2: Recipie[]=[];
  newRecipies:Recipie[]=[];
  myRecipie:Recipie;
  alerts: any[] = [];
  selectedRecipie:Recipie;
  recipieCode: String;
  productName: String;
  ingredient= [];
  quantity=[];
  unitCost=[];
  unitScale=[];
  available:Boolean;
  ingredientName2:String;
  quantityinScale2:Number;
  editIndex : number;
  itemNamex: String;
  unitScalex:String;
  unitCostx:number;
  
  
  

  constructor(public recipieService: RecipieService, public itemDetailService: ItemDetailService, public modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    console.log("oninit");
    this.refreshRecipieList();
    this.getItems();
    
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

  checkRecipeCodeAvailable(recipeCode){
    this.recipieService.getRecipes().subscribe((res) => {
      
      this.allRecipieList = res as Recipie[];
      localStorage.setItem("recipieKey1",JSON.stringify(this.allRecipieList));
              
      
    });
    console.log(this.allRecipieList);
    this.newRecipieList2= JSON.parse(localStorage.getItem("recipieKey1"));
    console.log(this.newRecipieList2);
    for (var i=0; i<this.newRecipieList2.length; i++){
      if (this.newRecipieList2[i].recipieCode == recipeCode){
        this.available = true;
        return;
      }
      else{
        this.available = false;
      }
    }   

  }
  
  editThis(i, template: TemplateRef<any>){
    this.editIndex = i;
    this.ingredientName2 = this.ingredient[i];
    this.quantityinScale2 = this.quantity[i];
    this.openModal(template);

  }

  editArray(form: NgForm){
    this.ingredient[this.editIndex] = form.value.ingredientName2;
    this.quantity[this.editIndex] = form.value.quantityinScale2;
    this.modalRef.hide();
    
  }
  deleteThis(i){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.ingredient.splice(i ,1);
        this.quantity.splice(i ,1);
        
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });
  }

  onSubmit(form: NgForm) {
    this.checkRecipeCodeAvailable(form.value.recipieCode);
    //this.myRecipie._id="5b77ccb187243520acb904f8";
    this.myRecipie.recipieCode = form.value.recipieCode;
    this.myRecipie.productName = form.value.productName;
    this.myRecipie.ingredient = this.ingredient;
    this.myRecipie.quantity = this.quantity;
    this.myRecipie.unitCost = this.unitCost;
    this.myRecipie.unitScale = this.unitScale;
    this.myRecipie.cost = 7777777;
    console.log("Horeey" + this.myRecipie.ingredient);
    console.log("Horeey" + this.myRecipie.recipieCode);
    console.log("Horeey" + this.myRecipie.cost);
//if recipe code is new
    if (this.available == false) {
      this.recipieService.addRecipe(this.myRecipie).subscribe((res) => {        
        this.refreshRecipieList();
        swal(
          'Recipe added successfully!',
          form.value.productName,                  
          'success'
        );
      });
      
    } else {
      this.recipieService.updateRecipe(this.myRecipie).subscribe((res) => {        
        this.refreshRecipieList();
        swal(
          'Recipe changes saved!',
          form.value.productName,                    
          'success'
        );
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
    this.recipieService.getRecipes().subscribe((res) => {
      
      this.allRecipieList = res as Recipie[];
      localStorage.setItem("recipieKey1",JSON.stringify(this.allRecipieList));
              
      
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
        this.unitScale = this.newRecipieList[i].unitScale;
        break;
      }
    }
  }

  public addToArray(form: NgForm){
    
    this.ingredient.push(form.value.ingredientName);
    this.quantity.push(form.value.quantityinScale);
    
    this.getUnitCost(form);
    this.unitCost.push(this.unitCostx);
    this.unitScale.push(this.unitScalex);
    console.log(this.ingredient);
    this.modalRef.hide();
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

  getItems(){
    this.itemDetailService.getItemList().subscribe((res) => {      
      this.itemList = res as Item[];
      localStorage.setItem("itemKey",JSON.stringify(this.itemList));           
      
    });
    this.itemList= JSON.parse(localStorage.getItem("itemKey"));
  }

  getUnitCost(form:NgForm){ 
    this.getItems(); 
    //console.log("sssssssss" + this.itemList);  
    this.itemNamex =form.value.ingredientName;
    for (var i=0; i<this.itemList.length; i++){
      if (this.itemList[i].itemname == this.itemNamex){
        this.unitCostx= this.itemList[i].unitCost;
        this.unitScalex= this.itemList[i].unitScale;
        console.log("unit Cost:" + this.unitCostx)
        return;
      }
    }
    swal(
      'This item is not in stock!',
      'Please add this item to the database first',                    
      'error'
    );
    

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
      unitScale:[{}],
      cost:null,
    
    };
    this.myRecipie = {
      _id:'',
      productName: '',
      recipieCode: '',      
      ingredient:[{}],
      quantity:[{}],
      unitCost:[{}],
      unitScale:[{}],
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
