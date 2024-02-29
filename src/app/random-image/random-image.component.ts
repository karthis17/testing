import { Component } from '@angular/core';
import { RandomImageService } from '../service/random-image.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-random-image',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.css'
})
export class RandomImageComponent {


  constructor(private randImg: RandomImageService) { }


  data: any;

  comments: any[] = [];

  frameName: string = '';
  file!: File;

  uploadedFrameUrl: string = '';
  uploadedFramePath: string = '';

  showUpdateButton: boolean = false;
  idToUpdate: any;

  frame: any;

  ngOnInit() {
    this.getAll();
  }

  getAll() {

    this.randImg.getAll().subscribe(r => { this.data = r; console.log(this.data) });

  }

  addFile(e: any) {
    this.file = e.target.files[0];
  }

  submit() {
    this.randImg.addFrame(this.file, this.frameName).subscribe(frame => { console.log(frame); this.getAll(); this.close() });
  }

  setUpdate(data: any) {
    this.frameName = data.frameName;
    this.uploadedFrameUrl = data.frameUrl;
    this.uploadedFramePath = data.framePath;
    this.idToUpdate = data._id;

    this.showUpdateButton = true;
  }

  close() {
    location.reload();
  }

  play() {
    return this.randImg.play().subscribe(data => { this.frame = data })
  }

  update() {
    this.randImg.update(this.file, this.frameName, this.uploadedFrameUrl, this.uploadedFramePath, this.idToUpdate).subscribe(message => { console.log(message); this.getAll() })
  }

  like(id: any) {
    this.randImg.like(id).subscribe(data => { console.log(data); this.getAll() })
  }

  share(id: any) {
    this.randImg.share(id).subscribe(data => { console.log(data); this.getAll() });
  }

  comm(id: any, index: any) {
    this.randImg.commet(id, this.comments[index]).subscribe(data => { console.log(data); this.getAll() });
  }

  delete(id: any) {
    this.randImg.delete(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

}
