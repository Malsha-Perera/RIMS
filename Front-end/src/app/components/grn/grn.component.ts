import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { GrnService } from '../../services/grn.service';
import {Grn} from "./grnt";
import { ItemDetailService } from '../../services/itemDetailService/item-detail.service';
//import { Item } from '../../models/item-detail.model';
import { NgForm, Validators, ValidationErrors, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
import {Item} from "../product-item/product";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.css'],
  providers: [GrnService],

})
export class GrnComponent implements OnInit {
  GRN:Grn[] = [];
  GoodRN:Grn[] = [];
  productitem:Item[] = [];
  private ArrayList:Array<any> = [];
  private newAttribute:any = {};

  poNo:Number;
  grnNo:Number;
  date:String;
  description:String;
  comments:String;
  itemname:String;
  quantity:number;
  unitCost:number;
  total:number;

  itemitem:Item;
  itemCode:String;


  constructor(public modalService:BsModalService, private dataservice:GrnService) {

  }

  public modalRef:BsModalRef;
  alerts:any[] = [];
  //constructor(private ddataservice:DDataService) { }


  getPo() {
    this.dataservice.getgrn()
      .subscribe(po=> {
        this.GoodRN = po;
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
  addItem(){

    const newItem = {

      itemname: this.itemname,
      quantity: this.quantity,
      itemCode:this.itemCode,
      unitCost:this.unitCost,
    }
    this.dataservice.addProductItem(newItem)
      .subscribe(item => {
        this.productitem.push(item);
        this.dataservice.getProductItems()
          .subscribe(productitem =>
            this.productitem = productitem);
        this.getItems();
        Swal({
          position: 'top',
          title: 'Item Added succesfully !',
          type: 'success',
          text: '',


        });
        this.clear();
      });
  }


  createGRN() {

    const newItem = {


      poNo: this.poNo,
      date: this.date,
      grnNo: this.grnNo,

      /* items: {
       itemname: this.itemname,
       pQuantity: this.pQuantity,
       unitPr: this.unitPr,
       total: this.total,
       }
       */

    }



    this.dataservice.addgrn(newItem)
      .subscribe(po => {
        this.GoodRN.push(po);
        this.dataservice.getgrn()
          .subscribe(grn =>
            this.GoodRN = grn);
        this.clearpo();
        this.getPo();
      });

    Swal({
      position: 'top',
      title: 'GRN Added succesfully !',
      type: 'success',
      text: '',


    });
  }





  public openModal(template:TemplateRef<any>) {
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-md'}); // {3}
  }


  deleteFieldValue(index) {
    this.ArrayList.splice(index, 1);
  }

  addFieldValue() {
    this.ArrayList.push(this.newAttribute);
    console.log(this.newAttribute);
    this.newAttribute = {};

  }

  clear() {
    this.itemname = null,
      this.quantity = null,
      this.unitCost = null,
      this.total = null;


  }

  clearpo() {


      this.poNo = null,
      this.date = null;
    this.itemname = null,
      this.quantity = null,
      this.unitCost = null,
      this.total = null;

  }




  ngOnInit() {
this.getPo()

  }
}



