import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appWidthChange]'
})
export class WidthChangeDirective implements OnInit, OnDestroy {
    @Output() widthChange: EventEmitter<number> = new EventEmitter<number>();
    private resizeObserver: ResizeObserver;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
    
        this.resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;
                this.widthChange.emit(newWidth);
            }
        });

        this.resizeObserver.observe(this.elementRef.nativeElement);
    }

    ngOnDestroy() {
        this.resizeObserver.unobserve(this.elementRef.nativeElement);
        this.resizeObserver.disconnect();
    }
}
