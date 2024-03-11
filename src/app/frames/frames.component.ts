import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FramService } from '../service/fram.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { fabric } from 'fabric';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-frames',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})

export class FramesComponent {

  farmeFile!: File;

  imageFile: File[] = [];

  frameName!: string;
  isActive: boolean = false;
  data!: any;

  resIma: any;
  showUpload: any;

  framei: any;

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

  uploadedFrameUrl: any;
  uploadedFramePath: any;

  langg: any[] = [];

  language: any;
  description: any;

  constructor(private frame: FramService, private languagee: LanguageService) { }


  ngOnInit(): void {
    this.getData();
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });


  }


  getData() {
    this.frame.getFrames().subscribe(frames => {
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


  trackByFn(index: any, item: any) {
    return index;
  }

  delete(id: any) {
    this.frame.delete(id).subscribe(data => { console.log(data); this.getData() });
  }

  // async showUpdate(data: any) {

  //   this.id = data._id;

  //   this.showUpdateButton = true;
  //   this.frameName = data.frameName;
  //   this.uploadedFrameUrl = data.frameUrl;
  //   this.uploadedFramePath = data.path;

  //   this.width = data.frame_size.width;
  //   this.height = data.frame_size.height;
  //   const canvas = this.canvasContainer.nativeElement;
  //   canvas.width = this.width;
  //   canvas.height = this.height;
  //   this.canvas?.setDimensions({ width: this.width, height: this.height });
  //   this.canvas?.renderAll();
  //   this.cdr.detectChanges();

  //   this.canvas?.setBackgroundImage(data.frameUrl, this.canvas.renderAll.bind(this.canvas));
  //   this.size = this.canvasSizeOptions.findIndex((options) => {
  //     return options.width === data.frame_size.width && options.height === data.frame_size.height;
  //   });

  //   this.squares.forEach((squares: fabric.Rect) => {
  //     this.canvas?.remove(squares);
  //   })

  //   this.squares = [];

  //   data.coordinates.forEach((coord: any) => {

  //     this.addSquare(coord.y, coord.x, coord.width, coord.height);
  //   });

  //   this.textBox.forEach((text: fabric.Rect) => {
  //     this.canvas?.remove(text);
  //   })

  //   this.textBox = [];
  //   this.texts_container = [];
  //   data.texts.forEach((coord: any) => {

  //     this.addTextBox(coord.y, coord.x, coord.width, coord.height);
  //     this.texts_container.push(coord.text);
  //   });
  // }

  close() {

    location.reload();

  }

  // update() {
  //   let size = [];
  //   let textS = [];
  //   for (const square of this.squares) {
  //     const width = (square.width ?? 0) * (square.scaleX ?? 1);
  //     const height = (square.height ?? 0) * (square.scaleY ?? 1);
  //     size.push({ x: square.left, y: square.top, width, height });
  //   }
  //   let i = 0;
  //   for (const text of this.textBox) {
  //     const width = (text.width ?? 0) * (text.scaleX ?? 1);
  //     const height = (text.height ?? 0) * (text.scaleY ?? 1);
  //     textS.push({ x: text.left, y: text.top, width, height, text: this.texts_container[i++] });
  //   }
  //   console.log(this.frameName, this.farmeFile, this.canvasSizeOptions[this.size], size, textS, this.id, this.uploadedFramePath, this.uploadedFrameUrl)

  //   this.frame.updateFrame(this.frameName, this.farmeFile, this.canvasSizeOptions[this.size], size, textS, this.uploadedFrameUrl, this.uploadedFramePath, this.id).subscribe(data => {
  //     console.log(data);
  //     this.close()
  //   })
  // }

}
