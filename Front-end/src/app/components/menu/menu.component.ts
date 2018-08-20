import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '../../models/Product';
import {ProductService} from "../../services/product.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Globals} from '../../globals/globals';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[ProductService],
})
export class MenuComponent implements OnInit {
  productList:Product[]=[];
  setMenuList:Product[]=[];
  shortEatsList:Product[]=[];
  dessertList:Product[]=[];
  saladList:Product[]=[];
  soupList:Product[]=[];
  beveragesList:Product[]=[];
  otherList:Product[]=[];
  product:Product[]=[];
  productName:String;
  productCode:String;
  unitCost:number;
  foodCategory:String;
  public modalRef: BsModalRef;

  constructor(private productservice:ProductService, public modalService: BsModalService,private router: Router) { }

  getProducts(){
    this.productservice.getProducts()
      .subscribe(products=>{
        this.productList=products;
        //console.log('product from productservice:'+this.productItemList[0].productName);
      })
      console.log(this.productList);        
  }

  setCode(){
    this.productCode = this.productName.substring(0,2) + this.count;
    
  }
  count =0;
  addProduct(){
    this.setCode();
   this.count = this.count +1;
    const newProduct = {
      productName: this.productName,
      productCode: this.productCode,
      //unitCost:this.unitCost,
      unitCost:100,
      foodCategory:this.foodCategory,     
    }
    this.productservice.addProduct(newProduct)
      .subscribe(item => {
        this.product.push(item);
        this.productservice.getProducts()
          .subscribe(item =>
            this.product = item);
        this.getProducts();
      });
      this.closeFirstModal();
  }

  createRecipe(productCode, productName){
    this.router.navigateByUrl('/addrecipie');
    Globals.recipeCode = productCode;
    Globals.productName = productName;
    console.log("Product Name is "+ Globals.productName);
    console.log(Globals.recipeCode);
    this.closeFirstModal();
  }

  setLists(){
    this.getProducts();
    this.setMenuList=[];
    this.shortEatsList=[];
    this.dessertList=[];
    this.saladList=[];
    this.soupList=[];
    this.beveragesList=[];
    this.otherList=[];
    for (let i = 0; i < this.productList.length; i++) {

      if (this.productList[i].foodCategory === "setMenu") {
        this.setMenuList.push(this.productList[i]);
      }
      else if (this.productList[i].foodCategory === "shortEats") {
        this.shortEatsList.push(this.productList[i]);
      }
      else if (this.productList[i].foodCategory === "dessert") {
        this.dessertList.push(this.productList[i]);
      }
      else if (this.productList[i].foodCategory === "beverages") {
        this.beveragesList.push(this.productList[i]);
      }
      else if (this.productList[i].foodCategory === "soup") {
        this.soupList.push(this.productList[i]);
      }
      else if (this.productList[i].foodCategory === "salad") {
        this.saladList.push(this.productList[i]);
      }
      else  {
        this.otherList.push(this.productList[i]);
      }
    }  

  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' }); // {3}
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  ngOnInit() {
   this.getProducts();
   

  }

}