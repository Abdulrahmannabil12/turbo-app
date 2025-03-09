export class MethodResult<T> {
    isSuccess: boolean;
    errors: string[];
    message: string;
    insertedId: number;
    data: T;
    totalRecords: number;
}