import { PatientRequestStatus } from '../enums/PatientRequestStatus.enum';
import { Base } from './base.model';
import { ProductModel } from './product.model';

export class PatientRequestModel extends Base {
  patientId: number;
  doctorId: number;
  requestStatusId: PatientRequestStatus | null;
  diseaseAreaId: number;
  producsts: Array<ProductModel>;
  constructor() {
    super();
    this.patientId = 0;
    this.doctorId = 0;
    this.requestStatusId = null;
    this.diseaseAreaId = 0;
    this.producsts = [];

  }
}
