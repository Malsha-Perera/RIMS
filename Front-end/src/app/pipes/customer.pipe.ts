import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../services/customers';
import { CustomerService } from '../services/customer.service';

@Pipe({
  name: 'customerFilter'
})
export class CustomerPipe implements PipeTransform {

  constructor(private customerService: CustomerService) {}

  transform(customers: Customer[], searchText: any): Customer[] {
    if (searchText === undefined) {
      return customers;
    }
    // tslint:disable-next-line:no-shadowed-variable
    return customers.filter(function(custom) {
      return custom.customer_name.toLowerCase().includes(searchText.toLowerCase());
    });
  }


}
