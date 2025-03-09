import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCasePipe'
})

export class CamelCasePipe implements PipeTransform {
  transform(value: any): string {
    // Split the string into words using spaces as separators
    if (value) {
      const words = value.toString().split(' ') as string[];
      const camalCaseString = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      return camalCaseString;
    }
    return '';
  }

}
