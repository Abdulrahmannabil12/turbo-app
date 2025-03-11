import { Component, OnInit, Input, ViewEncapsulation, } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { SnackBarService } from 'src/shared/services/snack-bar.service';
import { BaseTableService } from 'src/app/_metronic/shared/crud-table/services/base.table.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploaderComponent implements OnInit {

  @Input()
  public uploadURL: string;
  @Input()
  service: BaseTableService<any>;
  @Input()
  public placeholder: string;
  @Input()
  public formGroup: FormGroup
  @Input()
  public controlName: string
  @Input()
  public fileUrl: string;
  @Input()
  public maxValueInMB: number;
  @Input()
  public fileFormats: Array<string> = [];

  public progress: number;
  public isUploaded = false;
  public files: Array<FileBody> = [];
  constructor(private snackBar: SnackBarService) {

  }

  ngOnInit(): void {
    this.bindFiles();
  }

  get serviceIsNotEmpty(): boolean {
    return this.service && Object.keys(this.service).length > 0;
  }

  bindFiles() {

    if (this.formGroup && this.controlName && this.formGroup.get(this.controlName)?.value) {
      const file = new FileBody();
      file.name = this.formGroup.get(this.controlName).value;
      this.files.push(file);
      this.isUploaded = true;
    }
  }
  private uploadOnSuccess(event: any): void {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round((100 * event.loaded) / event.total);
    } else if (event.type === HttpEventType.Response) {
      this.formGroup.get(this.controlName).setValue(event.body?.data);
      this.snackBar.successMessage('Successfully upload!');
      setTimeout(() => {
        this.isUploaded = true;

      }, 2000);
    }
  }

  private uploadOnError(error: any): void {
    this.isUploaded = false;
    this.snackBar.showError(' Error happened!');

  }


  onFileChange(pFileList: File[]) {
    if (this.serviceIsNotEmpty) {

      if (pFileList.length === 0) {
        return;
      }
      const file = pFileList[0];
      if (!this.fileFormats.includes(file.type)) {
        this.snackBar.showError('Invalid file formate');
        return;
      }
      if (this.maxValueInMB && this.sizeInMB(file.size) > this.maxValueInMB) {
        this.snackBar.showError('file exceed max size ' + this.maxValueInMB + ' MB');
        return;
      }

      this.files = Object.keys(pFileList).map(key => pFileList[key]);

      const fileToUpload = file as File;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.service.uploadFile(this.uploadURL, formData).subscribe(
        (event) => this.uploadOnSuccess(event),
        (err) => this.uploadOnError(err)
      );

    }
  }
  getFileUrl() {
    debugger;
    if (this.serviceIsNotEmpty && this.fileUrl) {
      const url=this.service.getFileUrl(this.formGroup.get(this.controlName).value, this.fileUrl);
      console.log(url);
      return url;

    }

  }

  deleteFile(f) {
    this.files = this.files.filter(function (w) { return w.name != f.name });

  }
  public removeFile() {
    if (this.files && this.files.length > 0) {
      this.files = [];
      this.formGroup.get(this.controlName).setValue(null);
      this.snackBar.successMessage('Successfully removed!');
      this.isUploaded = false;
      this.progress = 0;
    }
  }

  sizeInMB(size: number) {
    return ((size / 1024) / 1024);
  }
}
export class FileBody {
  name?: string;
  size?: number;

  constructor() {
    this.name = '';
    this.size = null;
  }
}
