import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(items: any[], search: string, fields: any[]): any[] {
    if (!items || !search || !fields || fields.length === 0) {
      return items;
    }

    const lowerSearch = search.toLowerCase();

    return items.filter(item =>
      fields.some(field =>
        String(item[field]).toLowerCase().includes(lowerSearch)
      )
    );
  }

}
