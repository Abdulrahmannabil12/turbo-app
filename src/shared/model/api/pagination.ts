export class Pagination {
    totalRecords = 0;
    per_page = 0;
    current_page = 0;
    last_page = 0;
}


export class PaginationRequest {
    pagination: PaginationRequestModel
}


export class PaginationRequestModel {
    pageIndex: number;
    pageSize: number;
}