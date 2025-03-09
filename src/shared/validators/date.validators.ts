import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
// custom validator to check that two fields match
// tslint:disable-next-line: typedef
export function toFromDate(
  fromDateTime: string,
  toDateTime: string,
  fromDate: string,
  toDate: string
): any {
  return (formGroup: FormGroup) => {
    const fromTimeControl = formGroup.controls[fromDateTime];
    const toTimeControl = formGroup.controls[toDateTime];

    const fromDateControl = formGroup.get(fromDate);
    const toDateControl = formGroup.get(toDate);

    if (toTimeControl.errors && !toTimeControl.errors.invalidDate) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    if (fromTimeControl.value && toTimeControl.value && fromDateControl.value && toDateControl.value) {
       const fromDateVal = fromTimeControl.value as { hour: number, minute: number, second: number };
      const toDateVal = toTimeControl.value as { hour: number, minute: number, second: number };
      const fromDateObj = (fromDateControl?.value as moment.Moment)?.toDate();
      const toDateObj = (toDateControl?.value as moment.Moment).toDate();

      if ((+fromDateObj) < (+toDateObj)) {
        return;
      }

      const diff = getDiff({ toDateObj, toDateVal, fromDateObj, fromDateVal });
      const hours = Math.abs(diff) / 36e5;

      if (hours <= 2) {
        toTimeControl.setErrors({ invalidDate: true });
        return;
      }
    }

    toTimeControl.setErrors(null);

  };

  // tslint:disable-next-line:max-line-length
  function getDiff({ toDateObj, toDateVal, fromDateObj, fromDateVal }: { toDateObj: Date; toDateVal: any; fromDateObj: Date; fromDateVal: any; }) {
    return new Date(toDateObj.getFullYear(),
      toDateObj.getMonth(),
      toDateObj.getDay(),
      toDateVal.hour,
      toDateVal.minute,
      toDateVal.hour).valueOf() -
      new Date(fromDateObj.getFullYear(),
        fromDateObj.getMonth(),
        fromDateObj.getDay(),
        fromDateVal.hour,
        fromDateVal.minute,
        fromDateVal.hour).valueOf();
  }
}
