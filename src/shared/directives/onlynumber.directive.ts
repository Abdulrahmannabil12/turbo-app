import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[OnlyNumber]",
})
// export class OnlyNumber {

//   constructor(private el: ElementRef) { }

//   @Input() OnlyNumber: boolean;

//   @HostListener('keydown', ['$event']) onKeyDown(event) {
//     let e = <KeyboardEvent> event;
//     if (this.OnlyNumber) {
//       if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
//         // Allow: Ctrl+A
//         (e.keyCode == 65 && e.ctrlKey === true) ||
//         // Allow: Ctrl+C
//         (e.keyCode == 67 && e.ctrlKey === true) ||
//         // Allow: Ctrl+X
//         (e.keyCode == 88 && e.ctrlKey === true) ||
//         // Allow: home, end, left, right
//         (e.keyCode >= 35 && e.keyCode <= 39)) {
//           // let it happen, don't do anything
//           return;
//         }
//         // Ensure that it is a number and stop the keypress
//         if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//             e.preventDefault();
//         }
//       }
//   }
// }

// Várias outras ideias para adicionais mais opções, como
// maxlength, min, max, allowDecimals, allowSign, mask (?), etc
// aqui: https://stackoverflow.com/questions/41465542/angular2-input-field-to-accept-only-numbers
export class OnlyNumber {
  // private readonly regexStr = '^[0-9]*$';
  private readonly regEx = new RegExp("^[0-9]*$");

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber?: boolean;
  @Input() maxlength?: number;
  @Input() minValue?: number;
  @Input() maxValue?: number;

  @HostListener("keydown", ["$event"]) onKeyDown(event: any) {
    const e = <KeyboardEvent>event;


    if (this.OnlyNumber) {
      if (
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }

      // let ch = String.fromCharCode(e.keyCode);
      // let ch = event.key;
      // const current: string = this.el.nativeElement.value;
      // const next: string = current.concat(ch);
      // if(this.regEx.test(ch) && !this.isOverSize(next))
      if (!this.isValid(event.key)) e.preventDefault();
    }
  }
  @HostListener('input', ['$event'])
  public onInput(a_Event: InputEvent) {
    if (this.minValue || this.maxValue) {
      let val = parseInt(this.el.nativeElement.value);
      if (this.maxValue !== null && this.maxValue !== undefined && val >= this.maxValue)
        this.el.nativeElement.value = this.maxValue.toString();
      else if (this.minValue !== null && this.minValue !== undefined && val <= this.minValue)
        this.el.nativeElement.value = this.minValue.toString();
    }

  }
  @HostListener("paste", ["$event"]) onPaste(event: any) {
    // get and validate data from clipboard

    const pastedText = event.clipboardData.getData("text/plain");
    if (this.OnlyNumber) {
      if (pastedText) {
        // const current: string = this.el.nativeElement.value;
        // const next: string = current.concat(pastedText);
        // if (this.regEx.test(pastedText) && !this.isOverSize(next)) {
        if (!this.isValid(pastedText)) {
          event.preventDefault();
        }
      }
    }

  }


  private isValid(elegible: string): boolean {
    const current: string = this.el.nativeElement.value;
    if (current) {
      const next: string = current.concat(elegible);

      return this.regEx.test(elegible) && !this.isOverSize(next);
    }

    return this.regEx.test(elegible);
  }

  private isOverSize(str: string): boolean {
    if (this.maxlength && str) {
      // console.log(`${str.length} - ${this.maxlength}`);
      return str.length > this.maxlength;
    }
    return false;
  }
}
