import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MethodResult } from 'src/shared/model/MethodResult';
import { HttpService } from '../API/Base/http.service';
import { ExecutiveReportDto, ExecutiveReportResponse, ExecutiveReportSearchDto } from 'src/app/modules/executive-report/model/executiveReportSearch.dto';
@Injectable({
  providedIn: 'root'
})
export class ExecutiveReportService {
  domain = environment.apiUrl;
  controller = "ExecutiveReport"
  constructor(private service: HttpService) {
  }

  GetAll(searchReportDTO: ExecutiveReportSearchDto): Observable<MethodResult<ExecutiveReportResponse[]>> {
    return this.service.post(`${this.controller}/GetAll`, searchReportDTO);
  }

  Add(report: ExecutiveReportDto): Observable<MethodResult<ExecutiveReportResponse>> {
    return this.service.post<ExecutiveReportDto>(`${this.controller}/Create`, report);
  }


  Update(report: ExecutiveReportDto): Observable<MethodResult<ExecutiveReportResponse>> {
    return this.service.post<ExecutiveReportDto>(`${this.controller}/Update`, report);
  }


}
