import { Base } from "./base.model"

export class RequestAssignDetailsModel extends Base{
patientRequestId:number;
pharmacyId:number
    constructor(){
       super();
       this.patientRequestId=0;
       this.pharmacyId=0
    }}