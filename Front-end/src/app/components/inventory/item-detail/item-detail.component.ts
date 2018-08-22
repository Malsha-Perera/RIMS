import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, Validators, ValidationErrors, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SetRolComponent } from './set-rol/set-rol.component';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

// import { Chart } from 'chart.js';

import {  } from '../../../pipes/item-detail.pipe';
// import { Chart } from 'chart.js';
import swal from 'sweetalert2';


import { ItemDetailService } from '../../../services/itemDetailService/item-detail.service';
import { Item } from '../../../models/item-detail.model';
import { IssueItem } from '../../../models/issueItem';
import { ItemDetailPipe } from '../../../pipes/item-detail.pipe';
import { isNumber } from 'util';
import { formArrayNameProvider } from '../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
  providers: [ ItemDetailService],
})
export class ItemDetailComponent implements OnInit {

  @ViewChild(SetRolComponent) child;
  altertMsg = '';
  chart = [];
  public modalRef: BsModalRef;
  searchText = '';
  items: Item[];
  itemNames: Item[];
  alerts: any[] = [{}];
  issueOne: IssueItem;
  issuedItem: IssueItem;
  deleteItemId;
  viewItem: Item;
  newQuantity;
  editRolId;
  newROL;
  bsValue = new Date();
  count;
  today = new Date();
  constructor(public itemDetailService: ItemDetailService, public modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshItemList();
    this.resetIssueItem();
    this.resetIssuedItem();
    this.resetDeleteItemId();
    this.resetEditRol();
  }
  // method for open modal
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' }); // {3}
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  capitalizeFirstLetter(string): string {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  setItemCode(itemName: string): string {

    this.count = 0;
    // tslint:disable-next-line:prefer-const
    for ( let i = 0; i < this.items.length; i++) {
      this.count++;
    }
    // this.itemCode = this.itemname.substring(0, 2) + this.count;
    // tslint:disable-next-line:prefer-const
    let code = itemName.substring(0, 2) + this.count;

    return code;
  }

  /*---------------------start Add new Item Process or Update Existing Item------------------------------------------------ */
  // to check new item name user input whether existing on database
  checkExistId(itemname: string): boolean {

    // tslint:disable-next-line:prefer-const
    let result = true; // function return value

    // this.itemNames = this.items;
    // tslint:disable-next-line:prefer-const
    let nameArray: string[] = [];
    let i = 0;
    for ( i; i < this.items.length; i++) {
    nameArray[i] = this.items[i].itemname;

    }

    for (let j = 0; j < nameArray.length; j++) {

      // tslint:disable-next-line:prefer-const
      let name = this.capitalizeFirstLetter(itemname.trim());
      if (name === nameArray[j]) {
        result =  false;
      } else {
        continue;
      }

    }
    return result;
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      let res: boolean;
      res = this.checkExistId(form.value.itemname);
      // console.log(res);
        if (res === true) {
          let resCode;
          resCode = this.setItemCode(form.value.itemname);
          form.value.itemCode = resCode;
          form.value.date = this.today.toDateString();
          this.itemDetailService.postItem(form.value).subscribe((response) => {
            // this.addItemAlert();
            swal('New Item Added', this.altertMsg, 'success');
            this.resetForm(form);
            this.refreshItemList();
            this.closeFirstModal();
          });
        } else {
          swal({
            type: 'error',
            title: 'Entered Item Name is already exists!',
            text: 'Item Name Should be Unique',
          });
          // console.log('invalid submit');
          // this.wrongInputItemCodeAlert();
          // this.resetForm(form);
        }
    } else {
      form.value.date = this.today.toDateString();
      this.itemDetailService.putItem(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshItemList();
      });
    }
  }
  /*-------------------------------------End Item Adding Process--------------------------------- */

  refreshItemList() {
    this.itemDetailService.getItemList().subscribe((res) => {
      this.items = res as Item[];
    });
  }
  /*------------------------------Edit Item process------------------------------------------------------ */
  onEditSet(item: Item) {
    this.itemDetailService.selectedItem = item;
  }
  /*-----------------------Edit Re Order Level------------------------------*/

  onEditROLGetItem(itemCode: string) {
    this.editRolId = itemCode;
  }

  openSetROLModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm' }); // {3}
  }
  closeSetRolModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  onEditROL() {
    console.log(this.newROL);
    console.log(this.editRolId);
    this.itemDetailService.editROL(this.editRolId, this.newROL).subscribe((res) => {
      if (res['m'] === 'success') {
        // console.log(res);
        // this.addItemAlert();
        swal({
          type: 'success',
          title: 'Changes save Success!',
          text: 'Re Order Level',
        });
        this.refreshItemList();
        this.resetEditRol();

      }
    });
  }

  resetEditRol() {
    this.editRolId = '';
    this.newROL = null;
  }
  /*------------------------End Of the edit Rol Process---------------------- */

  /*-----------------------viewItem Process------------------------------- */
  public openViewItemModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }
  closeViewModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
  onView(item: Item) {
    this.viewItem = item;
  }

  resetViewItem() {
    this.viewItem = {
    _id: '',
    itemname: '',
    itemCode: '',
    category: 'ND',
    quantity: 0,
    description: '',
    unitCost: 0,
    latestUpdate: '',
    unitScale: 'ND',
    minimumLevel: 0,
    reOrderLevel: 50,
    maximumLevel: 0,
    date: ''

    };
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
        swal({
          type: 'success',
          title: 'Item Remove Success!',
          text: '',
        });
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
    category: 'ND',
    quantity: 0,
    description: '',
    unitCost: 0,
    latestUpdate: '',
    unitScale: 'ND',
    minimumLevel: 0,
    reOrderLevel: 50,
    maximumLevel: 0,
    date: ''

    };

  }

  addItemAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Item is added successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  wrongInputItemCodeAlert(): void {
    this.alerts.push({
      type: 'danger',
      msg: `Entered ItemCode should be unique`,
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
    this.resetIssueItem();
  }

  // reset the issue object and newQuantity after issuing process complete  //
  resetIssueItem() {
    this.issueOne = {
      itemName: '',
      itemCode: '',
      itemQuantity: null,
      date: ''
    };
    this.newQuantity = null;
  }

  resetIssuedItem() {
    this.issuedItem = {
      itemName: '',
      itemCode: '',
      itemQuantity: null,
      date: ''
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
    this.issuedItem.date = this.today.toDateString();
    // this.itemDetailService.issueItems = this.issueOne;
  }

  // confirm issue item //
  setIssueItem() {
    // check input issue quantity is valid type //
    if (isNaN(this.newQuantity)) {

      // this.addIssueError2();
      swal({
        type: 'error',
        title: 'Invalid Issue Quantity!',
        text: '',
      });
      this.resetIssueItem();

    } else {
      if ((this.newQuantity > this.issueOne.itemQuantity) || (this.newQuantity == null)) {
        // this.addIssueError1();
        swal({
          type: 'error',
          title: 'This Amount Cannot be issue!',
          text: 'Please Enter Correct Amount',
        });
        this.resetIssueItem();
      } else {
        this.issueOne.itemQuantity = this.issueOne.itemQuantity - this.newQuantity;
        this.issuedItem.itemQuantity = this.newQuantity;

        this.itemDetailService.postIssueItem(this.issuedItem).subscribe((res) => {
          if (res['m'] === 'error') {
            // this.addIssueError1();
            this.resetIssuedItem();
          }
          if (res['m'] === 'success') {
            // this.addIssueSuccess();
            swal({
              type: 'success',
              title: 'Changes save Success!',
              text: '',
            });
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
            // this.addIssueSuccess();
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

  sortItemList() {

  }
}
