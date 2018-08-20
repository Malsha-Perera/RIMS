import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../services/item';
import { ItemService } from '../services/item.service';

@Pipe({
  name: 'salesItemFilter'
})
export class SalesItemPipe implements PipeTransform {
  constructor(private itemService: ItemService) {}

  transform(items: Item[], searchText: any): Item[] {
    if (searchText === undefined) {
      return items;
    }
    // tslint:disable-next-line:no-shadowed-variable
    return items.filter(function(ite) {
      return ite.product_name.toLowerCase().includes(searchText.toLowerCase());
    });
  }


}
