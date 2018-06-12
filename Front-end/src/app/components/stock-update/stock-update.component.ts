import { Component, OnInit } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import {Item} from "../product-item/product";
import {DataService} from "../../services/data.service";
import {NgForm} from "@angular/forms";



@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.css'],
  providers:[DataService],
})
export class StockUpdateComponent implements OnInit {
  productItemList:Item[]=[];
  stockItemList:Item[]=[];
  productitem:Item[]=[];
  itemname:String;
  itemitem:Item;
  itemCode:String;
  quantity:number;
  unitCost:number;
  description:String;
  selectedItem:Item;
  _id:number;

  constructor(private dataservice:DataService) { }
  
  getItems(){
    this.dataservice.getProductItems()
      .subscribe(items=>{
        this.productItemList=items;
        //console.log('data from dataservice:'+this.productItemList[0].itemname);
      })

  }

  addToStock(itemNew,quantity,unitCost){ 
  
    let newItem = { //newItem:Item={}
      _id:itemNew._id,
      itemCode:itemNew.itemCode,
      itemname:itemNew.itemname,
      quantity:itemNew.quantity + quantity,
      description:itemNew.description,
      unitScale:itemNew.unitScale,
      unitCost:unitCost,

     };  
     this.stockItemList.push(newItem) 
    
   this.dataservice.updateproduct(newItem)
      .subscribe(result=>{
        console.log('original Item to be updated:'+result);
        this.getItems();
      }
    );
  }    
   
  getItembyCode(form1: NgForm,form2: NgForm ){
    
    this.itemCode=form1.value.itemCode;
    this.quantity = form2.value.quantity;
    this.unitCost = form2.value.unitCost;
    console.log(this.itemCode);
    console.log(this.quantity + "  " +this.unitCost);
    
   /*(No need to call for service again since getItems get the productlist already) 
   this.dataservice.getItem(this.itemCode)
      .subscribe(item=>{
        this.selectedItem=item;        
      })
      console.log(this.selectedItem);*/

      for (var i = 0; i < this.productItemList.length; i++) {
        
        if (this.itemCode==this.productItemList[i].itemCode) {
          this.addToStock(this.productItemList[i],this.quantity,this.unitCost);
          this.getItems();
          alert(this.productItemList[i].itemname + " prevails in " + this.productItemList[i].quantity + " " +this.productItemList[i].unitScale +" quantity in the stock." );
          console.log(this.productItemList[i]);

        }
      }

  }
  
  ngOnInit() {
    this.getItems();
  }

}

