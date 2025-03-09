import { Pagination } from './pagination';

export class Response<T> {
    data: T = {} as T;
    status = false;
    message = '';
    pagination: Pagination = new Pagination();
}
