import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ItemDetailService } from '../../../services/itemDetailService/item-detail.service';
import { Item } from '../../../models/item-detail.model';
import { ItemDetailPipe } from '../../../pipes/item-detail.pipe';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
  providers: [ ItemDetailService],
})
export class ItemDetailComponent implements OnInit {

  public modalRef: BsModalRef;
  searchText = '';
  items: Item[];
  constructor(public itemDetailService: ItemDetailService, public modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshItemList();
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md' }); // {3}
  }
  closeFirstModal() {
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

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are You Sure to delete this record ?') === true) {
      this.itemDetailService.deleteItemDetail(_id).subscribe((res) => {
        this.refreshItemList();
        this.resetForm(form);
      });
    }
  }

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

}

