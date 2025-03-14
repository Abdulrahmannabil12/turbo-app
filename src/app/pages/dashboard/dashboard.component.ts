import { Component, ViewChild } from '@angular/core';
import { DoctorService } from './_service/doctor.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { ModalConfig } from 'src/app/_core/partials/layout/modals/modal.config';
import { ModalComponent } from 'src/app/_core/partials/layout/modals/modal/modal.component';
import { PageInfoService } from 'src/app/_core/layout/core/page-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(public doctorService: DoctorService, private pageInfo: PageInfoService,
    public dialog: MatDialog,

    private fb: FormBuilder
  ) { }
  filterGroup: FormGroup;

  ngOnInit(): void {

    this.createFiltrationForm();
    this.filterGroup.markAsDirty();

    this.filterGroup.valueChanges.pipe(debounceTime(300))
      .subscribe(() => {
        this.doctorService.patchFilter(this.filterGroup.value);
      });
    setTimeout(() => {
      this.pageInfo.setBreadcrumbs([{
        title: 'Home',
        path: '/admin',
        isActive: true,
      }]);
    }, 5);
  }

  async openModal() {
    return await this.modalComponent.open();
  }
  createFiltrationForm() {
    this.filterGroup = this.fb.group({
      name: "",

    });
  }
}
