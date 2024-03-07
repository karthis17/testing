import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { PercentageTypeService } from '../service/percentage-type.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { fabric } from 'fabric';


@Component({
  selector: 'app-percentage-type',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './percentage-type.component.html',
  styleUrl: './percentage-type.component.css'
})
export class PercentageTypeComponent {

  constructor(private cdr: ChangeDetectorRef, private perType: PercentageTypeService) { }


  data: any;

  comments: any[] = [];


  question = "";


  file: any[] = [];
  range!: number;
  play: any;
  ress: any;

  showUpdateButton: boolean = false;
  idToUpdate: any;

  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }

  uploadedFrameUrl: any;
  uploadedFramePath: any;

  width: number = 720;
  height: number = 720;

  frames: any[] = [];


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
  squares!: fabric.Rect;


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

    const width = (this.squares.width ?? 0) * (this.squares.scaleX ?? 1);
    const height = (this.squares.height ?? 0) * (this.squares.scaleY ?? 1);
    let coordinates = { x: this.squares.left, y: this.squares.top, width, height };
    let frame_size = { width: this.width, height: this.height };
    if (coordinates && this.file[0]) {
      this.frames.push({ frame_size, coordinates });
    }



    if (this.canvas && this.file[0]) {
      this.canvas.clear();
      console.log(this.canvas)
      this.fileInput.nativeElement.value = null;
      this.addSquare()
    }

    console.log(this.frames)
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

    console.log(this.squares);

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
    this.squares = square;

  }


  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDif: { text: string, lang: string }[] = [
    { text: '', lang: this.langg[0] },
    { text: '', lang: this.langg[1] },
    { text: '', lang: this.langg[2] },
    { text: '', lang: this.langg[3] },
    { text: '', lang: this.langg[4] },
    { text: '', lang: this.langg[5] },
    { text: '', lang: this.langg[6] },
    { text: '', lang: this.langg[7] },
    { text: '', lang: this.langg[8] },
    { text: '', lang: this.langg[9] },
  ];


  ngOnInit() {
    this.getAll();
  }

  getAll() {

    this.perType.getAll().subscribe(r => { this.data = r; console.log(this.data) });

  }

  submit() {


    this.perType.addQuestion(this.question, this.frames, this.file, this.questionDif.filter(dis => { if (dis.text) return dis; else return false }), this.thumb).subscribe(frame => { console.log(frame); this.getAll(); this.close() });
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

    this.canvas?.remove(this.squares);

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

    this.perType.update(this.question, this.idToUpdate, this.frames, this.file, this.questionDif.filter(dis => { if (dis.text) return dis; else return false })).subscribe(message => { console.log(message); this.getAll() })
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
