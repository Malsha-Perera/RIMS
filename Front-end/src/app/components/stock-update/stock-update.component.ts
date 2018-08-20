import { Component, OnInit, OnChanges } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import {Item} from '../product-item/product';
import {DataService} from '../../services/data.service';
import {NgForm} from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { OnChange } from 'ngx-bootstrap';



@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.css'],
  providers: [DataService],
})
export class StockUpdateComponent implements OnInit {

  productItemList: Item[] = [];
  stockItemList: Item[] = [];
  productitem: Item[] = [];
  itemname: String;
  itemitem: Item;
  itemCode: String;
  quantity: Number;
  unitCost: Number;
  description: String;
  selectedItem: Item;
  _id: number;
  latestUpdate: Date;
  alerts: any[] = [];
  public tempArray =[];

  constructor(private dataservice: DataService) { }

  getItems() {
    this.dataservice.getProductItems()
      .subscribe(items => {
        this.productItemList = items;
        // console.log('data from dataservice:'+this.productItemList[0].itemname);
      });

  }


  addToStock(itemNew,quantity,unitCost,latestUpdate){

    let newItem = { //newItem:Item={}
      _id:itemNew._id,
      itemCode:itemNew.itemCode,
      itemname:itemNew.itemname,
      quantity:itemNew.quantity + quantity,
      description:itemNew.description,
      unitScale:itemNew.unitScale,
      unitCost:unitCost,
      latestUpdate:latestUpdate,

     };
     this.stockItemList.push(newItem) ;
     console.log("stock list  : " + this.stockItemList );


   this.dataservice.updateproduct(newItem)
      .subscribe(result => {
        console.log('original Item to be updated:' + result);
        this.getItems();
      }
    );
  }

  getItembyCode(form1: NgForm, form2: NgForm ) {
    OnChange();
    this.latestUpdate = form1.value.latestUpdate;
    this.itemCode = form1.value.itemCode;
    this.quantity = form2.value.quantity;
    this.unitCost = form2.value.unitCost;
    console.log(this.itemCode);
    console.log(this.quantity + ' ' + this.unitCost);

   /*(No need to call for service again since getItems get the productlist already)
   this.dataservice.getItem(this.itemCode)
      .subscribe(item=>{
        this.selectedItem=item;
      })
      console.log(this.selectedItem);*/

      for (let i = 0; i < this.productItemList.length; i++) {

        if (this.itemCode === this.productItemList[i].itemCode) {
          this.addToStock(this.productItemList[i], this.quantity, this.unitCost, this.latestUpdate);
          this.getItems();
          // tslint:disable-next-line:max-line-length
          //alert(this.productItemList[i].itemname + ' prevails in ' + this.productItemList[i].quantity + ' ' + this.productItemList[i].unitScale + ' quantity in the stock.' );
          console.log(this.productItemList[i]);
          this.updatedAlert(this.productItemList[i].itemname);
        }
      }

  }
  updatedAlert(name): void {
    this.alerts.push({
      type: 'success',
      msg: name + ' stock updated successfully' ,
      timeout: 5000
    });
  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  ngOnInit() {
    this.getItems();
  }

}

