import { Component, OnInit } from '@angular/core';
import { ItemDetailService } from '../../../services/itemDetailService/item-detail.service';
import { IssueItem } from '../../../models/issueItem';

@Component({
  selector: 'app-stock-issue',
  templateUrl: './stock-issue.component.html',
  styleUrls: ['./stock-issue.component.css'],
  providers: [ItemDetailService]
})
export class StockIssueComponent implements OnInit {

    issuedItems: IssueItem[];
    issuesChartItems: IssueItem[];
    dataSource: Object;
  constructor(private itemDetailService: ItemDetailService) {
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
          'label': 'Venezuela',
          'value': '290'
      }, {
          'label': 'Saudi',
          'value': '260'
      }, {
          'label': 'Canada',
          'value': '180'
      }, {
          'label': 'Iran',
          'value': '140'
      }, {
          'label': 'Russia',
          'value': '115'
      }, {
          'label': 'UAE',
          'value': '100'
      }, {
          'label': 'US',
          'value': '30'
      }, {
          'label': 'China',
          'value': '30'
      }]
    };
  }

  ngOnInit() {
    this.refreshIssuedItemList();
  }

  refreshIssuedItemList() {
    this.itemDetailService.getIssuedItems().subscribe((res) => {
      this.issuedItems = res as IssueItem[];
      // console.log(res);
    });
  }

  getIssueItems() {

  }
}
