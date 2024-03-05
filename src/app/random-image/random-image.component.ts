import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RandomImageService } from '../service/random-image.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fabric } from 'fabric';


@Component({
  selector: 'app-random-image',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.css'
})
export class RandomImageComponent {


  constructor(private randImg: RandomImageService, private cdr: ChangeDetectorRef) { }


  data: any;

  comments: any[] = [];

  frameName: string = '';
  file!: File;

  uploadedFrameUrl: string = '';
  uploadedFramePath: string = '';

  showUpdateButton: boolean = false;
  idToUpdate: any;

  frame: any;

  canvasWidth!: number;
  canvasHeight!: number;

  width: number = 720;
  height: number = 720;

  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }

  reff: any;
  addreff(e: any) {
    this.reff = e.target.files[0];
  }

  canvasSizeOptions: { width: number, height: number }[] = [
    { width: 720, height: 720 }, // Facebook Profile Picture (recommended)
    { width: 820, height: 312 }, // Facebook Cover Photo
    { width: 1080, height: 1080 }, // Instagram Post (square)
    { width: 1080, height: 1350 }, // Instagram Post (portrait)
    { width: 1080, height: 608 }, // Instagram Post (landscape)
    { width: 400, height: 400 }, // LinkedIn Profile Picture
    { width: 1584, height: 396 }, // LinkedIn Cover Photo
    { width: 1200, height: 300 }, // Website Banner/Header
    { width: 1280, height: 720 },
    { width: 800, height: 600 }
  ];

  size: any = 0;

  @ViewChild('canvasElement') canvasContainer!: ElementRef<HTMLCanvasElement>;
  private canvas: fabric.Canvas | undefined;
  squares: fabric.Rect[] = [];
  textBox: fabric.Rect[] = [];


  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.file = file;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        if (this.canvas) {
          this.canvasWidth = this.canvas.width ?? 0;
          this.canvasHeight = this.canvas.height ?? 0;
          const scaleFactor = Math.min(this.canvasWidth / img.width, this.canvasHeight / img.height);
          console.log(scaleFactor)
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
    this.setSize();
    this.canvas.on('object:modified', this.logSquareProperties.bind(this));
    this.addSquare()
  }


  setSize() {
    this.width = this.canvasSizeOptions[this.size].width;
    this.height = this.canvasSizeOptions[this.size].height;
    const canvas = this.canvasContainer.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.canvas?.setDimensions({ width: this.width, height: this.height }); // Update Fabric.js canvas dimensions
    this.canvas?.renderAll(); // Redraw canvas content
    this.cdr.detectChanges(); // Trigger change detection
  }

  logSquareProperties() {
    for (const square of this.squares) {
      console.log(square);
    }
  }

  addSquare(top = 100, left = 100, widht = 150, height = 50) {

    const square = new fabric.Rect({
      left: left,
      top: top,
      width: widht,
      height: height,
      fill: 'rgba(255, 255, 255, 0.5)',
      stroke: 'red',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });
    this.canvas?.add(square);
    this.squares.push(square);

  }


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
    let size = [];
    for (const square of this.squares) {
      const width = (square.width ?? 0) * (square.scaleX ?? 1);
      const height = (square.height ?? 0) * (square.scaleY ?? 1);
      size.push({ x: square.left, y: square.top, width, height });
    }
    this.randImg.addFrame(this.file, this.frameName, { width: this.width, height: this.height }, size, this.thumb, this.reff).subscribe(frame => { console.log(frame); this.getAll(); this.close() });
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
