import { NgOnChangesFeature } from '@angular/core/src/render3';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ItemDetailService } from '../../../services/itemDetailService/item-detail.service';
import { IssueItem } from '../../../models/issueItem';

@Component({
  selector: 'app-stock-issue',
  templateUrl: './stock-issue.component.html',
  styleUrls: ['./stock-issue.component.css'],
  providers: [ItemDetailService]
})
export class StockIssueComponent implements OnInit {

    issuedItems: any[] = [];
    issuesChartItems: IssueItem[];
    todayIssueItems: any[] = [];
    newIssueItems: any[];
    dataSource: Object;
    date = new Date();
  constructor(private itemDetailService: ItemDetailService) {
  }

  ngOnInit() {
    this.refreshIssuedItemList();
    this.setDataSource();
  }

  refreshIssuedItemList() {
    this.itemDetailService.getIssuedItems().subscribe((res) => {
      this.issuedItems = res as IssueItem[];
      localStorage.setItem('issueItemkey', JSON.stringify(this.issuedItems));
    });
  }


  setChartItems() {

    // tslint:disable-next-line:prefer-const
    let today = this.date.toDateString();
    let d = '';
    this.newIssueItems = JSON.parse(localStorage.getItem('issueItemkey'));
    let i = 0;
    for ( i; i < this.newIssueItems.length; i++) {

      // tslint:disable-next-line:prefer-const
      d = this.newIssueItems[i].issueDate;
      console.log(d);
      if (today === d) {
        this.todayIssueItems[i] = this.newIssueItems[i];
      } else {
        continue;
      }
    }
    this.dataSource = {
      chart: {
          'caption': 'Items Issue on Today',
          'subCaption': '',
          'xAxisName': 'Items',
          'yAxisName': 'issues (Kg)',
          'numberSuffix': 'Kg',
          'theme': 'gammel',
      },
      // Chart Data
      'data': [{
          'label': this.todayIssueItems[0].issueItemName,
          'value': this.todayIssueItems[0].issueItemQuantity
      }, {
          'label': this.todayIssueItems[1].issueItemName,
          'value': this.todayIssueItems[1].issueItemQuantity
      }, {
          'label': this.todayIssueItems[2].issueItemName,
          'value': this.todayIssueItems[2].issueItemQuantity
      }, {
          'label': this.todayIssueItems[3].issueItemName,
          'value': this.todayIssueItems[3].issueItemQuantity
      }, {
          'label': this.todayIssueItems[4].issueItemName,
          'value': this.todayIssueItems[4].issueItemQuantity
      }, {
          'label': this.todayIssueItems[5].issueItemName,
          'value': this.todayIssueItems[5].issueItemQuantity
      }, {
          'label': this.todayIssueItems[6].issueItemName,
          'value': this.todayIssueItems[6].issueItemQuantity
      }, {
          'label': this.todayIssueItems[7].issueItemName,
          'value': this.todayIssueItems[7].issueItemQuantity
      }]
    };
  }

  setDataSource() {

    this.dataSource = {
      chart: {
          'caption': 'Items purchase in One Year [2017-18]',
          'subCaption': 'In MMbbl = One Million barrels',
          'xAxisName': 'Items',
          'yAxisName': 'Purchases (Kg)',
          'numberSuffix': 'Kg',
          'theme': 'gammel',
      },
      // Chart Data
      'data': [{
          'label': '',
          'value': ''
      }, {
          'label': '',
          'value': ''
      }, {
          'label': '',
          'value': ''
      }, {
          'label': '',
          'value': ''
      }, {
          'label': '',
          'value': ''
      }, {
          'label': '',
          'value': ''
      }, {
          'label': '',
          'value': ''
      }, {
          'label': '',
          'value': ''
      }]
    };
  }
}
