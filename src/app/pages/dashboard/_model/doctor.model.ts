import { Base } from 'src/shared/model/base.model';

export class DoctorModel extends Base {
  location: string;
  name: string;
  address: string;
  locationLink: string;
  constructor() {
    super();
    this.location = '';
    this.locationLink = '';
  }
}
