import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Item } from '../../services/item';
import { Customer } from '../../services/customers';
import { ItemService } from '../../services/item.service';
import { CustomerComponent } from '../customer/customer.component';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { FormGroup,FormControl,Validators } from '@angular/forms';



@Component ({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [ItemService]
})

export class SalesComponent implements OnInit {

  public product_id;
  public product_name;
  public category;
  public date;
  public unit_scale;
  public qty1;
  public price1;
  public tot_price1;

  constructor(public modalService: BsModalService, private itemService: ItemService) { }
  public modalRef: BsModalRef;
  alerts: any[] = [];

  private ArrayList: Array<any> = [];
  private newAttribute: any = {};

  ItemList: Item[] = [];
  //CustomerList: Customer[] = [];
  CustomerList: Customer[]=[];
  ProductList: Item[] = [];

  ItemArray:Item[] = [];

  
  

  selectedItem: Item;
  toggleForm = false;

  customerDetails: any;
  productDeatails: any;

  price:any;
  quantity:any;
  total:any;
  

  public calcTotPrice() {
    this.tot_price1 = this.qty1 * this.price1;
    console.log("calcTot Triggered");
    console.log(this.tot_price1);
    console.log(this.qty1);
    console.log(this.price1);

  }

  


  

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' }); // {3}
  }

  public openEditModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1, {class: 'modal-md' }); // {3}
  }

  public openInvoiceModal(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2, {class: 'modal-md' }); // {3}
  }

  getItems() {
    this.itemService.getItems().subscribe(items => {
      this.ItemList = items;
    });
  }
  getItemId(id) {

  this.itemService.getItemId(id).subscribe(items => {
    this.ItemList = items;
  });
}






  addItem(form) {
   
    this.price=form.value.price;
    this.quantity=form.value.quantity;
    this.total=this.price*this.quantity;
    console.log(this.total);

    const newItem: Item = {

      product_id: form.value.product_id,
      product_name: form.value.product_name,
      category:form.value.category,
      date: form.value.date,
      unit_scale: form.value.unit_scale,
      quantity: form.value.quantity,
      price: form.value.price,
      total_price:this.total
    };
    const newCustomer: Customer = {
      customer_id: form.value.customer_id,
      customer_name: form.value.customer_name,
      mobile: form.value.mobile,
      address: form.value.address,
      email_address: form.value.email_address
    };

 this.CustomerList.push(newCustomer);
 this.ProductList.push(newItem);

 

    this.itemService.addItem(newItem).subscribe(items => {
      this.getItems();
    });
   

    this.itemService.addCustomer(newCustomer).subscribe(customers => {
      });

    this.modalRef.hide();
    
  }

  sumItem(){
    this.total;
    console.log(this.total);
  }

  deleteItems(id) {
    this.itemService.deleteItems(id).subscribe(data => {
      console.log(data);
      if (data.n === 1) {
        for (let i = 1; i < this.ItemList.length; i++) {
          if (id === this.ItemList[i]._id) {
            this.ItemList.splice(i, 1);

          }
        }
      }
      this.getItems();
    });
  }
  showEditForm(item) {
    this.selectedItem = item;
  }
  updateItem(form) {
    const newItem: Item = {
      _id: this.selectedItem._id,
      product_id: form.value.product_id,
      product_name: form.value.product_name,
      category:form.value.category,
      date: form.value.date,
      quantity: form.value.quantity,
      unit_scale: form.value.unit_scale,
      price: form.value.price,
      total_price:form.value.total_price
    };
    this.itemService.updateItems(newItem).subscribe(result => {
      console.log('Item is Updated' + result);
      this.getItems();
      this.modalRef.hide();
    });
  }

  addSalesItemCustomerAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Sales Items and Customer are added successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  updateSalesItemAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Sales Items is updated successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  deleteSalesItemAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Sales Items is deleted successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  
deleteFieldValue(index) {
  this.ArrayList.splice(index, 1);
}
addFieldValue() {
  this.ArrayList.push(this.newAttribute);
  console.log(this.newAttribute);


  this.newAttribute = {};
}



  ngOnInit() {
    this.getItems();
  }


  }








