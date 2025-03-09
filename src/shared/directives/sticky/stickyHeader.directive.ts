import { Directive, ElementRef, Inject, Renderer2 } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import {
    distinctUntilChanged,
    map,
    pairwise,
    startWith,
    takeUntil
} from "rxjs/operators";
import { DestroyService } from "./destroy.service";
import { WINDOW } from "@ng-web-apis/common";

const THRESHOLD = 65;
 

@Directive({
    selector: "[sticky]",
    providers: [DestroyService]
})
export class StickyDirective {
    constructor(
        @Inject(DestroyService) destroy$: Observable<void>,
        @Inject(WINDOW) windowRef: Window,
        renderer: Renderer2,
        { nativeElement }: ElementRef<HTMLElement>
    ) {
        fromEvent(windowRef, "scroll")
            .pipe(
                map(() => windowRef.scrollY),
                pairwise(),
                map(([prev, next]) => { 
                    const isFixed = ( next) <= THRESHOLD
                    return isFixed?undefined:(next < THRESHOLD || prev > next )}),
                distinctUntilChanged(),
                startWith(undefined),
                takeUntil(destroy$)
            )
            .subscribe(stuck => {
                renderer.setAttribute(nativeElement, "data-stuck", String(stuck));
            });
    }
}
