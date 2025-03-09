import { NameId } from "./NameId.model";

export class FilterControlModel {
  controlName: string;
  controlLabel: string;
  controlValue?: string | boolean | number;
  controlType: string;
  dataSource?: NameId[] | any[] |undefined |null;
  isVisible?: boolean;
  onlyNumber?:boolean;
  required?:boolean;
  constructor() {
    this.controlName = '';
    this.controlLabel = '';
    this.controlValue = undefined;
    this.isVisible = true;
    this.controlType = 'text';
    this.dataSource = [];
    this.onlyNumber=false
    this.required =false
  }

}
