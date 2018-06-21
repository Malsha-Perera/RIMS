import { Component, OnInit } from '@angular/core';
//import {Po}from './vpa';
import {Po}from'../create-po/cpo'
import {poItem}from '../po-list/Po-item';
import {DataService} from "../../services/po.service";

@Component({
  selector: 'app-view-po-all',
  templateUrl: './view-po-all.component.html',
  styleUrls: ['./view-po-all.component.css'],
  providers:[DataService],
})
export class ViewPoAllComponent implements OnInit {

  PoList:Po[]=[];
  PurchaseOrder:Po[]=[];
  productitem:poItem[]=[];
  private ArrayList: Array<any> = [];
  private newAttribute: any = {};
  vendor:String;
  poNo:Number;
  ppoNo:Number;
  description:String;
  comments:String;
  itemname:String;
  quantity:number;
  unitPr:number;
  total:number;

  constructor(private dataservice:DataService) { }
  //constructor(private ddataservice:DDataService) { }


  getPo(){
    this.dataservice.getPo()
      .subscribe(pos=>{
        this.PoList=pos;
        //console.log('data from dataservice:'+this.productItemList[0].itemname);
      })

  }
  getItems(){

    this.dataservice.getProductItems()
      .subscribe(items=>{
        this.productitem=items;
        //console.log('data from dataservice:'+this.productItemList[0].itemname);
      })

  }
  createPo(){

    const newPo = {
      vendor:this.vendor,
      poNo:this.poNo,
      description:this.description,
      comments:this.comments,
      /* items: {
       itemname: this.itemname,
       pQuantity: this.pQuantity,
       unitPr: this.unitPr,
       total: this.total,
       }
       */

    }


    this.dataservice.createPo(newPo)
      .subscribe(po => {
        this.PurchaseOrder.push(po);
        this.dataservice.getPo()
          .subscribe(PurchaseOrder =>
            this.PurchaseOrder = PurchaseOrder);
        this.getPo();
      });



  }


  Additem(){
    const newItem = {
      itemname: this.itemname,
      quantity: this.quantity,
      unitPr:this.unitPr,
      total:this.unitPr*this.quantity,
      poNo:this.poNo,

    }
    this.dataservice.addProductItem(newItem)
      .subscribe(item => {
        this.productitem.push(item);
        this.dataservice.getProductItems()
          .subscribe(productitem =>
            this.productitem = productitem);
        this.clear()
        this.getItems()

      });

  }
  deleteproduct(id) {

    this.dataservice.deleteproduct(id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < this.productitem.length; i++) {
            if (id==this.productitem[i]._id) {
              this.productitem.splice(i, 1);
              this.getItems();

            }
          }
        }
      })
  }

  deleteFieldValue(index) {
    this.ArrayList.splice(index, 1);
  }
  addFieldValue() {
    this.ArrayList.push(this.newAttribute);
    console.log(this.newAttribute);
    this.newAttribute = {};

  }
  clear(){
    this.itemname=null,
      this.quantity=null,
      this.unitPr=null,
      this.total=null;



  }


  ngOnInit() {
    this.getItems();
    this.getPo();

  }

}

