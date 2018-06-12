import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item-detail.model';
import { ItemDetailService } from '../services/itemDetailService/item-detail.service';
import { SlicePipe } from '@angular/common';

@Pipe({
  name: 'itemDetail'
})
export class ItemDetailPipe implements PipeTransform {

  constructor(private itemDetailService: ItemDetailService) {}

  transform(items: Item[], searchText: any): Item[] {
    if (searchText === undefined) {
      return items;
    }
    // tslint:disable-next-line:no-shadowed-variable
    return items.filter(function(item) {
      return item.itemname.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}

