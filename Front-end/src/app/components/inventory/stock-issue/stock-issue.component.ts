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
  constructor(private itemDetailService: ItemDetailService) { }

  ngOnInit() {
    this.refreshIssuedItemList();
  }

  refreshIssuedItemList() {
    this.itemDetailService.getIssuedItems().subscribe((res) => {
      this.issuedItems = res as IssueItem[];
      // console.log(res);
    });
  }
}
