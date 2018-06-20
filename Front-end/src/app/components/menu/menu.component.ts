import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import {ProductService} from "../../services/product.service";

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

  constructor(private productservice:ProductService) { }

  getProducts(){
    this.productservice.getProducts()
      .subscribe(products=>{
        this.productList=products;
        //console.log('product from productservice:'+this.productItemList[0].itemname);
      })
      console.log(this.productList);
      

      
  }
  setLists(){
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
  

  ngOnInit() {
   this.getProducts();
   

  }

}