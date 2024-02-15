import { Component } from '@angular/core';
import { FramService } from '../service/fram.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-frames',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})

export class FramesComponent {

  farmeFile!: File;

  imageFile!: File;

  frameName!: string;

  data!: any;

  ngOnInit(): void {
    this.getData()
  }


  getData() {
    this.frame.getFrames().subscribe(frames => {
      this.data = frames;
    })
  }


  addFile(e: any) {
    this.farmeFile = e.target.files[0];
  }
  addImageFile(e: any) {
    this.imageFile = e.target.files[0];
  }

  constructor(private frame: FramService) { }

  submit() {
    this.frame.uploadFrame(this.frameName, this.farmeFile).subscribe(frame => {
      console.log(`Upload`, frame);
      this.getData()
    })
  }

  uloadImage(frame_id: string) {
    this.frame.uploadImage(this.imageFile, frame_id).subscribe(frame => {
      console.log(`Upload`, frame);
      this.getData()
    })
  }


}
