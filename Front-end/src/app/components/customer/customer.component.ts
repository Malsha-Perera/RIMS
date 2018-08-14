import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Customer } from '../../services/customers';
import { CustomerService  } from '../../services/customer.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  public modalRef: BsModalRef;
  CustomerList: Customer[] = [];
  selectedCustomer: Customer;
  alerts: any[] = [];

  constructor(
    private customerService: CustomerService, public modalService: BsModalService
  ) { }

  public openEditModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1, {class: 'modal-md' }); // {3}
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe(customs => {
      this.CustomerList = customs;

    });
  }
  deleteCustomer(id) {
    this.customerService.deleteCustomer(id).subscribe(data => {
      console.log(data);
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
  }

}
