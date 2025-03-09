import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './headers.interceptors';
import { HttpErrorInterceptor } from './httpError.interceptor';
import { LoaderInterceptor } from './loader.interceptors';

export const Interceptors = [
  {
    useClass: HeaderInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: LoaderInterceptor,
  },
  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: HttpErrorInterceptor,
  },
];
