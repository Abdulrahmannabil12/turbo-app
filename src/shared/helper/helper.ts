import { KeyValue } from '../model/KeyValuemodel';
import { NameId } from '../model/NameId.model';

export function IsNullOrEmptyString(value: string): boolean {
  return value == null || value === "" || value.length === 0;
}

export function ArrayIsNotEmpty<T>(value: T[]): boolean {
  return value && value.length > 0;
}

export function ObjectHasValue(obj: any): boolean {
  return obj !== undefined && obj != null && Object.keys(obj).length > 0;
}

export function CloneObject<T>(obj: T): T {
  const objString = JSON.stringify(obj);
  return JSON.parse(objString);
}

export function ConvertObjectToString<T>(obj: T): string {
  if (ObjectHasValue(obj)) {
    return JSON.stringify(obj);
  }
  return "";
}


export function ConvertEnumToArray(enumObj: any): KeyValue[] {
  return Object.keys(enumObj)
    .filter((key) => !isNaN(Number(enumObj[key])))
    .map((key) => {
      return {
        name: key,
        id: Number(enumObj[key]),
      } as KeyValue;
    });
}


/*export function ConvertEnumToArrayOfKeyValue(Enum:any):Array<{Name:string,Id:number}> {
  return Object.keys(Enum)
    .filter((v) => isNaN(Number(v)))
    .map((Name) => {

      return {
        Name,
        Id: Enum[Name as keyof typeof Enum],
      };
    });
}
*/
export function ConvertEnumToArrayOfKeyValue(Enum: any, keys?: string[]): Array<any> {
  return Object.keys(Enum)
    .filter((v) => isNaN(Number(v)))
    .map((Name) => {
      const obj: { [key: string]: any } = {};
      if (keys && keys?.length > 0) {
        obj[keys[0]] = Enum[Name as keyof typeof Enum].toString();
        obj[keys[1]] = camelize(Name);
        return obj;
      }
      else {
        return {
          Name,
          Id: Enum[camelize(Name) as keyof typeof Enum],
        };
      }

    });
}

// export function camelize(str:string) {
//   return  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
//     {
//         return chr.toUpperCase();
//     });
// }

export function camelize(str: string) {
  return str.toLowerCase().replace(/_./g, function (match) {
    return ' ' + match.charAt(1).toUpperCase();
  }).replace(/_/g, ' ')
    .replace(/^\w/, function (match) {
      return match.toUpperCase();
    });
}

