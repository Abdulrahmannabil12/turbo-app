import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appHorizontalScroll]",
})
export class HorizontalScrollDirective {
  constructor(private element: ElementRef) { }

  @HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    const targetEvent: any = event.currentTarget
    if (targetEvent?.scrollLeftMax) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.element.nativeElement.scrollLeft += (event.deltaY + 5);
  }
}
