import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Customer } from '../../services/customers';
import { CustomerService  } from '../../services/customer.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { ItemService } from '../../services/item.service';
import { Item } from '../../services/item';
import Swal from 'sweetalert2';
import { CustomerPipe } from '../../pipes/customer.pipe';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService,ItemService]
})
export class CustomerComponent implements OnInit {
  public modalRef: BsModalRef;
  CustomerList: Customer[] = [];
  ItemList:Item[]=[];
  selectedCustomer: Customer;
  alerts: any[] = [];
  searchText = '';

  constructor(
    private customerService: CustomerService, public modalService: BsModalService,public itemService:ItemService
  ) { }

  public openEditModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1, {class: 'modal-md' }); // {3}
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe(customs => {
      this.CustomerList = customs;

    });
  }

  getItem(){
    this.itemService.getItems().subscribe(items=>{
      this.ItemList=items;
    })
  }

  

  deleteCustomer(id) {
    this.customerService.deleteCustomer(id).subscribe(data => {
      if (data.n === 1) {
        for (let i = 1; i < this.CustomerList.length; i++) {
          if (id === this.CustomerList[i]._id) {
            this.CustomerList.slice(i, 1);
          }
        }
      }
     


      this.getCustomers();
     
    }
   
  );
  
 
 
  }
  

  showEditCustomer(customers) {
    this.selectedCustomer = customers;
  }

  updateCustomer(form) {
    const newCustomer: Customer = {
      _id: this.selectedCustomer._id,
      customer_id: form.value.customer_id,
      customer_name: form.value.customer_name,
      mobile: form.value.mobile,
      address: form.value.address,
      email_address: form.value.email_address
    };
    this.customerService.updateCustomer(newCustomer).subscribe(result => {
      Swal({
        position: 'top',
        title: 'Customer is succesfully updated!',
        type: 'success',
        text: '',
        
        
      });
      console.log('Item Updated' + result);
      this.modalRef.hide();
      this.getCustomers();
    });
  }

  updateCustomerAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Customer is updated successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  deleteCustomerAlert(): void {
    this.alerts.push({
      type: 'success',
      msg: `Customer is deleteted successfully! (added: ${new Date().toLocaleTimeString()})`,
      timeout: 3000
    });
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }



  ngOnInit() {
    this.getCustomers();
    //this.getItem();
  }

  onAllerDeletet(id){
    Swal({
      position: 'top',
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal(
          
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.deleteCustomer(id)
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }

  


}
