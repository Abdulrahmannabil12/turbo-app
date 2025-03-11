export class ResponseData<T> {
  data: T;
  //statusCode?: number;
  message?: string;
  errors?:Array<string>;
  isSuccess?: boolean;
  InsertedId?: number;
  totalRecords: number;
}
