import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, Validators, ValidationErrors } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SetRolComponent } from './set-rol/set-rol.component';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
//import { Chart } from 'chart.js';

import { ItemDetailService } from '../../../services/itemDetailService/item-detail.service';
import { Item } from '../../../models/item-detail.model';
import { IssueItem } from '../../../models/issueItem';
import { ItemDetailPipe } from '../../../pipes/item-detail.pipe';
import { isNumber } from 'util';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
  providers: [ ItemDetailService],
})
export class ItemDetailComponent implements OnInit {

  @ViewChild(SetRolComponent) child;
  chart = [];
  public modalRef: BsModalRef;
  searchText = '';
  items: Item[];
  alerts: any[] = [{}];
  issueOne: IssueItem;
  issuedItem: IssueItem;
  deleteItemId;
  newQuantity;
  constructor(public itemDetailService: ItemDetailService, public modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshItemList();
    this.resetIssueItem();
    this.resetIssuedItem();
    this.resetDeleteItemId();
  }
  // method for open modal
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' }); // {3}
  }
  public openSetROLModal(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2, {class: 'modal-sm' }); // {3}
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  closeSetROLModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.itemDetailService.postItem(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshItemList();
      });
    } else {
      this.itemDetailService.putItem(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshItemList();
      });
    }
  }

  refreshItemList() {
    this.itemDetailService.getItemList().subscribe((res) => {
      this.items = res as Item[];
    });
  }

  onEdit(item: Item) {
    this.itemDetailService.selectedItem = item;
  }

  onEdit1(item: Item) {
    this.itemDetailService.selectedItem = item;
  }

  /*------------Delete Item Process----------------------------- */

  openConfirmDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm' });
  }

  closeConfirmDeleteModal() {
    this.modalRef.hide();
    this.modalRef = null;
    this.refreshItemList();
    this.resetDeleteItemId();
  }

  setDeleteItem(itemId) {
    this.deleteItemId = itemId;
  }
  onDelete(form: NgForm) {

      this.itemDetailService.deleteItemDetail(this.deleteItemId).subscribe((res) => {
        this.refreshItemList();
        this.resetDeleteItemId();
        this.resetForm(form);
      });
  }

  resetDeleteItemId() {
    this.deleteItemId = '';
  }
  /*--------------------------End Delete Item Process */
  resetForm(form?: NgForm) {

    if (form) {
      form.reset();
    }
    this.itemDetailService.selectedItem = {
      _id: '',
    itemname: '',
    itemCode: '',
    category: '',
    quantity: null,
    description: '',
    unitCost: null,
    latestUpdate: null,
    unitScale: '',
    minimumLevel: null,
    reOrderLevel: null,
    maximumLevel: null,
    date: null

    };

  }

  addItemAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Item is added successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
/*---------------------starting issue an item-----------------------------------------------------------------------------------*/

  // open modal to enter the quantity of issue item //
  openIssueModal(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template3, {class: 'modal-sm' });
  }

  // close modal after issue an item //
  closeIssueModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  // reset the issue object and newQuantity after issuing process complete  //
  resetIssueItem() {
    this.issueOne = {
      itemName: '',
      itemCode: '',
      itemQuantity: null
    };
    this.newQuantity = null;
  }

  resetIssuedItem() {
    this.issuedItem = {
      itemName: '',
      itemCode: '',
      itemQuantity: null
    };
  }

  // assign values to issue object properties //
  issueItem(item: Item): any {
    this.issueOne.itemName = item.itemname;
    this.issueOne.itemCode = item.itemCode;
    this.issueOne.itemQuantity = item.quantity;
    // console.log(this.issueOne);
    this.issuedItem.itemCode = item.itemCode;
    this.issuedItem.itemName = item.itemname;
    // this.itemDetailService.issueItems = this.issueOne;
  }

  // confirm issue item //
  setIssueItem() {
    // check input issue quantity is valid type //
    if (isNaN(this.newQuantity)) {

      this.addIssueError2();
      this.resetIssueItem();

    } else {
      if ((this.newQuantity > this.issueOne.itemQuantity) || (this.newQuantity == null)) {
        this.addIssueError1();
        this.resetIssueItem();
      } else {
        this.issueOne.itemQuantity = this.issueOne.itemQuantity - this.newQuantity;
        this.issuedItem.itemQuantity = this.newQuantity;

        this.itemDetailService.postIssueItem(this.issuedItem).subscribe((res) => {
          if (res['m'] === 'error') {
            this.addIssueError1();
            this.resetIssuedItem();
          }
          if (res['m'] === 'success') {
            this.addIssueSuccess();
            this.resetIssuedItem();
          }
        });
      // console.log(this.issueOne);
        this.itemDetailService.putIssueItem(this.issueOne).subscribe((res) => {
          if (res['m'] === 'error') {
            this.addIssueError1();
            this.resetIssueItem();
          }
          if (res['m'] === 'success') {
            this.addIssueSuccess();
            this.refreshItemList();
            this.resetIssueItem();
          }
          // console.log(response['m']);
        });
      }
    }
  }

  addIssueSuccess(): void {
    this.alerts.push({
      type: 'success',
      msg: 'Well done! Issuing Success',
      timeout: 4000
    });
  }

  addIssueError1(): void {
    this.alerts.push({
      type: 'danger',
      msg: 'Quantity must be Less Than Current Quantity',
      timeout: 3000
    });
  }

  addIssueError2(): void {
    this.alerts.push({
      type: 'danger',
      msg: 'Quantity Must Be A Number',
      timeout: 3000
    });
  }

  /*--------------------end of the issue an item process----------------------------------------- */

  /*this.chart = new Chart('canvas', {
    type: 'bar',
    data: {
      labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
      datasets: [
        {
          label: 'Population (millions)',
          backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f','#e8c3b9','#c45850'],
          data: [2478, 5267, 734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
  });*/


}

