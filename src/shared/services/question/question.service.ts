import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MethodResult } from 'src/shared/model/MethodResult';
import { HttpService } from '../API/Base/http.service';
import { ExecutiveReportDto } from 'src/app/modules/executive-report/model/executiveReportSearch.dto';
import { UserAnswersResponse } from 'src/app/modules/questions/model/userAnswers';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  domain = environment.apiUrl;
  controller = "Question"
  constructor(private service: HttpService) {
  }


  Add(report: any): Observable<MethodResult<boolean>> {
    return this.service.post<ExecutiveReportDto>(`${this.controller}/Create`, report);
  }


  GetAnswersByUserId(userId: number): Observable<MethodResult<UserAnswersResponse[]>> {
    return this.service.get(`${this.controller}/GetById?id=${userId}`);
  }

}
