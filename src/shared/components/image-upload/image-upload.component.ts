import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ImageUploadComponent implements OnInit {
  submitted: boolean = false;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) { }
  registrationForm: FormGroup = new FormGroup({
    file: new FormControl(""),
  });
  @ViewChild("fileInput") el: ElementRef;
  editFile: boolean = true;
  removeUpload: boolean = false;
  @Output()
  onUpload: EventEmitter<any> = new EventEmitter();
  @Input() FormGroup: FormGroup;
  @Input() controlName: string;
  @Input() imageUrl: any;
  @Input() defaultImageUrl: any;

  @Input() hasErrorRequired: boolean;
  @Input() widthHightClass: string;
  @Input() radiusClass: string;
  displayedImage: any = "./assets/media/avatars/blank.png";

  ngOnInit() {
    if (this.imageUrl && !this.FormGroup.get(this.controlName)?.value) {
      this.removeUpload = true;
      console.log(this.FormGroup.get(this.controlName)?.value)
      this.FormGroup.get(this.controlName)?.setValue(this.imageUrl);
    }
    if (this.defaultImageUrl) {
      this.displayedImage = this.defaultImageUrl;
    }
    if (this.FormGroup.get(this.controlName)?.value) {
      this.bindFileOnEdit();
    }
  }
  bindFileOnEdit() {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = this.FormGroup.get(this.controlName)?.value.file;
    const fileToUpload = file as File;

    if (file) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.displayedImage = reader.result;
        this.imageUrl = reader.result;
        this.registrationForm.get("file")?.setValue(fileToUpload);
        this.editFile = false;
        this.removeUpload = true;
        this.onUpload.emit(this.registrationForm.value);
      };
    }
  }
  uploadFileFromUrl(imageUrl: string): void {
    this.http
      .get(imageUrl, {
        responseType: "blob" as "json",
      })
      .subscribe((blob: any) => {
        const file = new File([blob], "filename.jpg", {
          type: "image/jpeg",
        });
        console.log(file);
        // here you can emit file object to continue with the uploading cycle
      });
  }
  uploadFile(event: any) {
    this.FormGroup.get(this.controlName)?.setValue("");
    this.displayedImage =
      this.defaultImageUrl || "./assets/media/avatars/blank.png";
    this.registrationForm.get("file")?.setValue('');

    this.imageUrl = "";
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    const fileToUpload = file as File;

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.displayedImage = reader.result;
        this.imageUrl = reader.result;
        this.registrationForm.get("file")?.setValue(fileToUpload);
        this.editFile = false;
        this.removeUpload = true;
        this.onUpload.emit(this.registrationForm.value);
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    this.FormGroup.get(this.controlName)?.setValue("");
    this.imageUrl = this.defaultImageUrl || "./assets/media/avatars/blank.png";
    this.registrationForm.get("file")?.setValue("");
    let newFileList = Array.from(this.el.nativeElement.files);
    this.displayedImage =
      this.defaultImageUrl || "./assets/media/avatars/blank.png";
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: "",
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      alert("Please fill all the required fields to create a super hero!");
      return false;
    } else {
      this.onUpload.emit(this.registrationForm.value);
    }
  }
}
