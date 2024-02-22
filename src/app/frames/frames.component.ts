import { Component, ElementRef, ViewChild } from '@angular/core';
import { FramService } from '../service/fram.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { fabric } from 'fabric';

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

  comment: any[] = [];
  canvasWidth!: number;
  canvasHeight!: number;
  resIma: any;

  @ViewChild('canvasElement') canvasContainer!: ElementRef<HTMLCanvasElement>;
  private canvas: fabric.Canvas | undefined;
  private squares: fabric.Rect[] = [];


  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.farmeFile = file;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        if (this.canvas) {
          this.canvasWidth = this.canvas.width ?? 0;
          this.canvasHeight = this.canvas.height ?? 0;
          const scaleFactor = Math.min(this.canvasWidth / img.width, this.canvasHeight / img.height);
          this.canvas.setBackgroundImage(img.src, this.canvas.renderAll.bind(this.canvas), {
            scaleX: scaleFactor,
            scaleY: scaleFactor,
          });
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }



  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasContainer.nativeElement);
    this.canvas.on('object:modified', (event: any) => {
      const modifiedObject = event.target;
      if (modifiedObject && modifiedObject instanceof fabric.Rect) {
        // Get the updated width and height directly from the modified object
        const width = (modifiedObject.width ?? 0) * (modifiedObject.scaleX ?? 1); // Use 0 as default width if width is undefined
        const height = (modifiedObject.height ?? 0) * (modifiedObject.scaleY ?? 1); // Use 0 as default height if height is undefined
        console.log(`Square X: ${modifiedObject.left}, Y: ${modifiedObject.top}, Width: ${width}, Height: ${height}`);
      }
    });
  }



  addSquare() {
    if (!this.canvas) {
      console.error('Canvas not initialized.');
      return;
    }

    const square = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: 'rgba(255, 255, 255, 0.5)',
      stroke: 'red',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });

    this.canvas.add(square);
    this.squares.push(square);
  }

  logSquareProperties() {
    for (const square of this.squares) {
      console.log(square);
    }
  }

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
    let size;
    for (const square of this.squares) {
      const width = (square.width ?? 0) * (square.scaleX ?? 1);
      const height = (square.height ?? 0) * (square.scaleY ?? 1);
      size = { x: square.left, y: square.top, width, height };
    }

    console.log(this.frameName, this.farmeFile, { widht: this.canvasWidth, height: this.canvasHeight }, size)
    this.frame.uploadFrame(this.frameName, this.farmeFile, { width: this.canvasWidth, height: this.canvasHeight }, size).subscribe(frame => {
      console.log(`Upload`, frame);
      this.getData()
    })
  }

  uloadImage(frame_id: string) {
    this.frame.uploadImage(this.imageFile, frame_id).subscribe((frame: any) => {
      console.log(`Upload`, frame);
      this.resIma = frame.link;
      this.getData()
    })
  }

  like(id: any) {
    this.frame.like(id).subscribe(frame => { console.log(`Like`, frame); this.getData() });
  }


  share(id: any) {
    this.frame.share(id).subscribe(data => { console.log(data); this.getData() });
  }

  comm(id: any, index: any) {
    this.frame.commet(id, this.comment[index]).subscribe(data => { console.log(data); this.getData() });
  }



}
