import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FramService } from '../service/fram.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-frames',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})

export class FramesComponent {

  farmeFile!: any;


  frameName!: string;
  isActive: boolean = false;
  data!: any;


  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }

  addFile(e: any) {
    this.farmeFile = e.target.files[0];
  }


  reff: any;
  addreff(e: any) {
    this.reff = e.target.files[0];
  }


  id: any;

  showUpdateButton: boolean = false;

  langg: any[] = [];
  idToupadte: any
  language: any;
  description: any;

  constructor(private frame: FramService, private languagee: LanguageService) { }


  ngOnInit(): void {
    this.getData();
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });


  }


  getData() {
    this.frame.getAll().subscribe(frames => {
      this.data = frames;
    })
  }


  submit() {


    this.frame.uploadFrame(this.frameName, this.farmeFile, this.thumb, this.reff, this.language, this.description, this.isActive).subscribe(frame => {
      console.log(frame)
    })
  }

  // uloadImage(frame_id: string) {
  //   this.frame.uploadImage(this.imageFile, frame_id, this.resTexts).subscribe((frame: any) => {
  //     this.resIma = frame.link;
  //     this.getData()
  //   })
  // }

  setUpdate(data: any) {
    this.thumb = data.thumbnail;
    this.reff = data.referenceImage;
    this.farmeFile = data.frameUrl;
    this.language = data.language;
    this.description = data.description;
    this.frameName = data.frameName;
    this.isActive = data.isActive;
    this.idToupadte = data._id

    this.showUpdateButton = true;
  }



  update() {
    this.frame.update(this.frameName, this.farmeFile, this.thumb, this.reff, this.language, this.description, this.isActive, this.idToupadte).subscribe(frame => {
      console.log(frame);
      this.getData()
    })
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  delete(id: any) {
    this.frame.delete(id).subscribe(data => { console.log(data); this.getData() });
  }


  close() {

    location.reload();

  }

  publish(id: any) {
    this.frame.publish(id).subscribe(data => this.getData())
  }

  draft(id: any) {
    this.frame.draft(id).subscribe(data => this.getData());
  }


}
