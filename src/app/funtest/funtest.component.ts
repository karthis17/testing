import { ChangeDetectorRef, Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { PercentageTypeService } from '../service/percentage-type.service';
import { fabric } from 'fabric';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FuntestService } from '../service/funtest.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-funtest',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './funtest.component.html',
  styleUrl: './funtest.component.css'
})
export class FuntestComponent {

  constructor(private cdr: ChangeDetectorRef, private perType: PercentageTypeService, private funtest: FuntestService, private languagee: LanguageService) { }


  data: any;

  comments: any[] = [];


  question = "";

  description: any;
  file: any[] = [];
  // range!: number;
  play: any;
  ress: any;
  texts = [''];
  type: string = 'random image'

  language: any = "english";

  showUpdateButton: boolean = false;
  idToUpdate: any;

  range = [{
    x: 0,
    y: 0,
    value: 0,
  }]


  isActive: boolean = false;

  noOfimage: any = 0;
  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }

  uploadedFrameUrl: any;
  uploadedFramePath: any;

  width: number = 720;
  height: number = 720;

  frames: any[] = [];

  texts_container: any[] = []

  canvasWidth!: number;
  canvasHeight!: number;

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
  @ViewChild('fileInput') fileInput!: ElementRef;
  private canvas: fabric.Canvas | undefined;

  squares: fabric.Rect[] = [];
  // textBox: fabric.Rect[] = [];
  textPosition!: fabric.Rect;
  percentagePosition!: fabric.Rect;


  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.file.push(file);
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

  addFrame() {
    let coord = this.squares.map((square) => {

      const width = (square.width ?? 0) * (square.scaleX ?? 1);
      const height = (square.height ?? 0) * (square.scaleY ?? 1);

      this.noOfimage++;
      this.canvas?.remove(square);
      return { x: square.left, y: square.top, width, height };

    });

    // let text = this.textBox.map((text, i) => {
    //   const width = (text.width ?? 0) * (text.scaleX ?? 1);
    //   const height = (text.height ?? 0) * (text.scaleY ?? 1);
    //   let noOfName = this.texts_container[i].split(' ').filter((x: any) => x.trim().includes('<fname'))
    //   this.canvas?.remove(text);
    //   return { x: text.left, y: text.top, width, height, text: this.texts_container[i], noOfName }

    // });

    let textPosition;

    if (this.textPosition) {
      const width = (this.textPosition.width ?? 0) * (this.textPosition.scaleX ?? 1);
      const height = (this.textPosition.height ?? 0) * (this.textPosition.scaleY ?? 1);
      textPosition = { x: this.textPosition.left, y: this.textPosition.top, width: width, height: height };
    }

    let percentagePosition;

    if (this.percentagePosition) {
      const width = (this.percentagePosition.width ?? 0) * (this.percentagePosition.scaleX ?? 1);
      const height = (this.percentagePosition.height ?? 0) * (this.percentagePosition.scaleY ?? 1);
      percentagePosition = { x: this.percentagePosition.left, y: this.percentagePosition.top, width: width, height: height };
    }

    this.squares = [];
    // this.textBox = [];

    this.frames.push({ coordinates: coord, frame_size: { width: this.width, height: this.height }, textPosition, percentagePosition });

    this.canvas?.clear();

    console.log(this.frames)


  }

  removeSquare(index: number) {
    if (index < 0 || index >= this.squares.length) {
      console.error('Invalid index:', index);
      return;
    }

    this.canvas?.remove(this.squares[index]);

    this.squares.splice(index, 1);
  }

  // removeTextBox(index: number) {
  //   if (index < 0 || index >= this.textBox.length) {
  //     console.error('Invalid index:', index);
  //     return;
  //   }

  //   this.canvas?.remove(this.textBox[index]);

  //   this.textBox.splice(index, 1);
  // }


  // addTextBox(top = 100, left = 100, widht = 100, height = 100) {
  //   if (!this.canvas) {
  //     console.error('Canvas not initialized.');
  //     return;
  //   }

  //   const text = new fabric.Rect({
  //     left: left,
  //     top: top,
  //     width: widht,
  //     height: height,
  //     fill: 'rgba(0, 0, 0, 0.5)',
  //     stroke: 'green',
  //     strokeWidth: 2,
  //     selectable: true,
  //     hasControls: true,
  //     lockRotation: true,
  //   });

  //   this.canvas.add(text);
  //   this.textBox.push(text);
  // }


  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasContainer.nativeElement);
    this.setSize();
    this.canvas.on('object:modified', this.logSquareProperties.bind(this));

  }


  addTextpos() {
    const text = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 50,
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: 'blue',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });

    if (this.textPosition) {
      this.canvas?.remove(this.textPosition)
    }
    this.canvas?.add(text);
    this.textPosition = text;
  }

  addPerPos() {
    const text = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 50,
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: 'blue',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });

    this.canvas?.add(text);
    this.percentagePosition = text;
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

    console.log(this.squares);

  }

  addSquare(top = 100, left = 100, widht = 150, height = 100) {

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


  langg: any[] = []



  ngOnInit() {
    this.getAll();
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });
  }

  getAll() {

    this.perType.getAll().subscribe(r => { this.data = r; console.log(this.data) });

  }

  submit() {


    this.funtest.addQuestion(this.question, this.texts, this.frames, this.description, this.language, this.thumb, this.type, this.file, this.noOfimage, this.range, this.isActive).subscribe(frame => {
      console.log(frame); this.getAll(); this.close();

    });
  }



  setUpdate(data: any) {
    this.question = data.question;
    this.idToUpdate = data._id;
    this.frames = data.frames;


    this.showUpdateButton = true;


  }

  clickToedit(i: any) {
    this.width = this.frames[i].frame_size.width;
    this.height = this.frames[i].frame_size.height;
    const canvas = this.canvasContainer.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.canvas?.setDimensions({ width: this.width, height: this.height });
    this.canvas?.renderAll();
    this.cdr.detectChanges();

    this.canvas?.setBackgroundImage(this.frames[i].frameUrl, this.canvas.renderAll.bind(this.canvas));
    this.size = this.canvasSizeOptions.findIndex((options) => {
      return options.width === this.frames[i].frame_size.width && options.height === this.frames[i].frame_size.height;
    });

    this.canvas?.clear()

    let coord = this.frames[i].coordinates;

    this.addSquare(coord.y, coord.x, coord.width, coord.height);

  }

  deleteFrame(i: any) {
    this.frames.splice(i, 1);
  }

  close() {
    location.reload();
  }

  update() {

    this.perType.update(this.question, this.idToUpdate, this.frames, this.file, this.language).subscribe(message => { console.log(message); this.getAll() })
  }

  submitAns(id: any) {
    this.perType.result(id, this.range).subscribe(result => { this.ress = result });
  }

  start(id: any) {
    this.perType.getQuestion(id).subscribe((data: any) => this.play = data)
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  delete(id: any) {
    this.perType.delete(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }
}