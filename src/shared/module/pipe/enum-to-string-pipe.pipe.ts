import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToStringPipe'
})

export class EnumToStringPipe implements PipeTransform {
  transform(value: any, enumType: any): string {
    const keys = Object.keys(enumType).filter(k => typeof enumType[k as any] === 'number');
    const enumValue = keys.find(k => enumType[k as any] === value);
    return enumValue ? enumValue.toString() : '';
  }

}
