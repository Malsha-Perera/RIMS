import { Component, OnInit,TemplateRef } from '@angular/core';
import { Invoice } from '../../services/invoice';
import { InvoiceService } from '../../services/invoice.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [InvoiceService]
})
export class InvoiceComponent implements OnInit {

  constructor(public invoiceService:InvoiceService) { }

  public modalRef: BsModalRef;
  InvoiceList: Invoice[] = [];
  selectedInvoice: Invoice;
  alerts: any[] = [];
  searchText = '';

  getInvoice(){
    this.invoiceService.getInvoice().subscribe(invoices=>{
      this.InvoiceList=invoices;
    })
  }

  
  deleteInvoice(id) {
    this.invoiceService.deleteInvoice(id).subscribe(data => {
      if (data.n === 1) {
        for (let i = 1; i < this.InvoiceList.length; i++) {
          if (id === this.InvoiceList[i]._id) {
            this.InvoiceList.slice(i, 1);
          }
        }
      }
     

this.getInvoice();
     
     
    }
   
  );
  
 
 
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
        this.deleteInvoice(id)
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



  ngOnInit() {
    this.getInvoice();
  }



  download() {

    const doc = new jsPDF();
     const col = ['company Address', 'Company Name'];
     doc.page = 1;
     const rows = [];
     this.InvoiceList.forEach(user => {
      const temp = [user.com_address, user.com_name];
      rows.push(temp);
  });
  doc.autoTable(col, rows, { startY: 20 });
  doc.text('User Collections', 10, 10);
  doc.save('user_collections.pdf');
}

}
