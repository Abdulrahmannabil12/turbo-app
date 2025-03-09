import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { HttpService } from '../../services/API/Base/http.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent implements OnInit {
  public progress: number;
  public message: string;
  public isUploaded: boolean;
  public imgURLList = new Array<string>();

  @Input()
  public uploadURL: string;

  @Input()
  public placeholder: string;

  @Output()
  public onUploadFinished = new EventEmitter();

  constructor(private httpService: HttpService) { }

  ngOnInit(): void { }

  public uploadFile = (files: any[]) => {
    if (files.length === 0) {
      return;
    }
    
    let file = files[0];
    if (!file.type.includes('pdf')) {
      this.message="Invalid file extension."
      return;
    }
    this.message='';
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.httpService.uploadFile(this.uploadURL, formData).subscribe(
      (event) => this.uploadOnSuccess(event),
      (err) => this.uploadOnError(err)
    );
  }

  private uploadOnSuccess(event: any): void {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round((100 * event.loaded) / event.total);
    } else if (event.type === HttpEventType.Response) {
      this.isUploaded = true;
      this.onUploadFinished.emit(event.body);
    }
  }

  private uploadOnError(error: any): void {
    this.isUploaded = false;
  }
}
