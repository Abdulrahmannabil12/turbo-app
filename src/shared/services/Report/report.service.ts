import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MethodResult } from 'src/shared/model/MethodResult';
import { HttpService } from '../API/Base/http.service';
import { SearchReportDTO } from 'src/app/modules/report/model/search-report.dto';
import { ReportDto, TemplateDto } from 'src/app/modules/report/model/report-dto.model';
import { NameId } from 'src/shared/model/NameId.model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  domain = environment.apiUrl;
  controller = "report"
  constructor(private service: HttpService) {
  }

  GetAll(searchReportDTO: SearchReportDTO): Observable<MethodResult<ReportDto[]>> {
    return this.service.post(`${this.controller}/GetAll`, searchReportDTO);
  }

  GetAllLite(): Observable<NameId[]> {
    return this.service.get(`${this.controller}/GetNameIdLite`);
  }

  Add(report: ReportDto): Observable<MethodResult<ReportDto>> {
    return this.service.post<ReportDto>(`${this.controller}/Create`, report);
  }

  Update(report: ReportDto): Observable<MethodResult<ReportDto>> {
    return this.service.post<ReportDto>(`${this.controller}/Update`, report);
  }

  GetTemplateByReportId(reportId: number): Observable<MethodResult<TemplateDto[]>> {
    return this.service.get(`${this.controller}/TemplateByReportId?id=${reportId}`);
  }


}
