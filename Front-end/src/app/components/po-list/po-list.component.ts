import { Component, OnInit } from '@angular/core';
import {poItem} from "./po-item";
import {DDataService} from "../../services/po-list.service";

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css']
})
export class PoListComponent implements OnInit {

  productItemList:poItem[]=[];
  productitem:poItem[]=[];
  itemname:String;
  itemitem:poItem;
  quantity:number;
  poNo:Number;
  unitPr:Number;
  total:Number;
  description:String;
  selectedItem:poItem;
  _id:number
  toggleForm:boolean=false




  constructor(private dataservice:DDataService) { }
  getItems(){
    this.dataservice.getProductItems()
      .subscribe(items=>{
        this.productItemList=items;
        //console.log('data from dataservice:'+this.productItemList[0].itemname);
      })

  }
  deleteproduct(id) {

    this.dataservice.deleteproduct(id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < this.productItemList.length; i++) {
            if (id==this.productItemList[i]._id) {
              this.productitem.splice(i, 1);
              this.getItems();

            }
          }
        }
      })
  }



  addItem(){
    const newItem = {
      itemname: this.itemname,
      quantity: this.quantity,
      unitPr:this.unitPr,
      total:this.total,
      poNo:this.poNo,

    }
    this.dataservice.addProductItem(newItem)
      .subscribe(item => {
        this.productitem.push(item);
        this.dataservice.getProductItems()
          .subscribe(productitem =>
            this.productitem = productitem);
        this.getItems()
      });
  }
  showEditFrm(item){
    this.selectedItem=item;
    this.toggleForm=!this.toggleForm;
  }
  /*editproduct(form){
   let newItem :Item={
   _id:this.selectedItem._id,
   itemname:form.value.itemname,
   quantity:form.value.quantity,
   description:form.value.description,


   };

   this.dataservice.updateproduct(newItem)
   .subscribe(result=>{
   console.log('original Item to be updated:'+result);
   this.getItems();
   });
   this.toggleForm=!this.toggleForm;

   }
   */




  ngOnInit() {
    this.getItems();

  }

}
