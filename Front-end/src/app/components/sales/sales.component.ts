import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Item } from '../../services/item';
import { Customer } from '../../services/customers';
import { ItemService } from '../../services/item.service';
import { CustomerComponent } from '../customer/customer.component';



@Component ({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [ItemService]
})
export class SalesComponent implements OnInit {

  constructor(public modalService: BsModalService, private itemService: ItemService) { }
  public modalRef: BsModalRef;

  private ArrayList: Array<any> = [];
  private newAttribute: any = {};

  ItemList: Item[] = [];
  selectedItem: Item;
  toggleForm = false;

  customerDetails: any;
  productDeatails: any;

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' }); // {3}
  }

  public openEditModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1, {class: 'modal-md' }); // {3}
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
    const newCustomer: Customer = {
      customer_id: form.value.customer_id,
      customer_name: form.value.customer_name,
      mobile: form.value.mobile,
      address: form.value.address,
      email_address: form.value.email_address
    };

    const newItem: Item = {
      product_id: form.value.product_id,
      product_name: form.value.product_name,
      quantity: form.value.quantity,
      weight: form.value.weight,
      price: form.value.price
    };

    this.itemService.addItem(newItem).subscribe(items => {

    });

    this.itemService.addCustomer(newCustomer).subscribe(customers => {
      });

    this.modalRef.hide();
    this.getItems();
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
      quantity: form.value.quantity,
      weight: form.value.weight,
      price: form.value.price
    };
    this.itemService.updateItems(newItem).subscribe(result => {
      console.log('Item is Updated' + result);
      this.getItems();
      this.modalRef.hide();
    });
  }

  ngOnInit() {
    this.getItems();
  }


  }








