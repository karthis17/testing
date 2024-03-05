import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RandomTextService } from '../service/random-text.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fabric } from 'fabric';

@Component({
  selector: 'app-random-text',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './random-text.component.html',
  styleUrl: './random-text.component.css'
})
export class RandomTextComponent {

  constructor(private cdr: ChangeDetectorRef, private perType: RandomTextService) { }


  data: any;

  comments: any[] = [];

  texts: string[] = [''];

  question = "";

  range!: number;
  play: any;
  ress: any;

  file: any;

  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }
  canvasWidth!: number;
  canvasHeight!: number;

  showUpdateButton: boolean = false;
  idToUpdate: any;

  uploadedFrameUrl: any;
  uploadedFramePath: any;

  width: number = 720;
  height: number = 720;

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

    this.perType.getAll().subscribe(r => { this.data = r; console.log(this.data) });

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
    this.perType.addQuestion(this.question, this.texts, this.file, { width: this.width, height: this.height }, size, this.thumb, this.reff).subscribe(frame => { console.log(frame); this.getAll(); this.close() });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  setUpdate(data: any) {
    this.question = data.question;
    this.texts = data.texts;
    this.idToUpdate = data._id;

    this.uploadedFrameUrl = data.frameUrl;
    this.uploadedFramePath = data.path;

    this.width = data.frame_size.width;
    this.height = data.frame_size.height;
    const canvas = this.canvasContainer.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.canvas?.setDimensions({ width: this.width, height: this.height });
    this.canvas?.renderAll();
    this.cdr.detectChanges();

    this.canvas?.setBackgroundImage(data.frameUrl, this.canvas.renderAll.bind(this.canvas));
    this.size = this.canvasSizeOptions.findIndex((options) => {
      return options.width === data.frame_size.width && options.height === data.frame_size.height;
    });

    this.squares.forEach((squares: fabric.Rect) => {
      this.canvas?.remove(squares);
    })

    this.squares = [];

    data.coordinates.forEach((coord: any) => {

      this.addSquare(coord.y, coord.x, coord.width, coord.height);
    });

    this.showUpdateButton = true;
  }

  close() {
    location.reload();
  }

  update() {
    let size = [];
    for (const square of this.squares) {
      const width = (square.width ?? 0) * (square.scaleX ?? 1);
      const height = (square.height ?? 0) * (square.scaleY ?? 1);
      size.push({ x: square.left, y: square.top, width, height });
    }
    this.perType.update(this.question, this.texts, this.idToUpdate, this.uploadedFramePath, this.uploadedFrameUrl, this.file, size, { width: this.width, height: this.height }).subscribe(message => { console.log(message); this.getAll() })
  }

  start(id: any) {
    this.perType.getQuestion(id).subscribe((data: any) => this.play = data)
  }

  like(id: any) {
    this.perType.like(id).subscribe(data => { console.log(data); this.getAll() })
  }

  share(id: any) {
    this.perType.share(id).subscribe(data => { console.log(data); this.getAll() });
  }

  comm(id: any, index: any) {
    this.perType.commet(id, this.comments[index]).subscribe(data => { console.log(data); this.getAll() });
  }

  delete(id: any) {
    this.perType.delete(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

}
