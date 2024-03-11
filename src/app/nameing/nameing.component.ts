import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PercentageTypeService } from '../service/percentage-type.service';
import { FuntestService } from '../service/funtest.service';
import { fabric } from 'fabric'
import { NamingService } from '../service/naming.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-nameing',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nameing.component.html',
  styleUrl: './nameing.component.css'
})
export class NameingComponent {
  constructor(private cdr: ChangeDetectorRef, private nameing: NamingService, private languagee: LanguageService) { }


  data: any;

  comments: any[] = [];

  flamei: any;

  facts: any[] = [{
    fact: '',
    gender: 'male'
  }]

  meanings: any[] = [{
    letter: '',
    meaning: [" "]
  }]

  addMeanig(i: any) {
    this.meanings[i].meaning.push(" ");
  }

  question = "";

  description: any;
  file: any[] = [];
  // range!: number;
  play: any;
  ress: any;
  isActive: boolean = false;
  type: string = 'name meaning'

  language: any = "english";

  showUpdateButton: boolean = false;
  idToUpdate: any;

  percentageTexts = [{
    minPercentage: 0,
    maxPercentage: 1,
    text: [" "],
  }]

  addText(i: any) {
    this.percentageTexts[i].text.push(" ");
  }
  a() {
    console.log(this.percentageTexts)
    console.log(this.meanings)
  }

  flames_word = ["friend", "love", "affection", "marriage", "enmity", "sibling"];

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

  isactive: boolean = false;
  text_b!: string;

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


  textBox!: fabric.Rect | undefined;
  name1!: fabric.Rect | undefined;
  name2!: fabric.Rect | undefined;
  textPosition!: fabric.Rect | undefined;
  percentagePosition!: fabric.Rect | undefined;
  WordPosition!: fabric.Rect | undefined;



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

    let name1;

    if (this.name1) {
      const width = (this.name1.width ?? 0) * (this.name1.scaleX ?? 1);
      const height = (this.name1.height ?? 0) * (this.name1.scaleY ?? 1);
      name1 = { x: this.name1.left, y: this.name1.top, width: width, height: height };
    }
    let name2;

    if (this.name2) {
      const width = (this.name2.width ?? 0) * (this.name2.scaleX ?? 1);
      const height = (this.name2.height ?? 0) * (this.name2.scaleY ?? 1);
      name2 = { x: this.name2.left, y: this.name2.top, width: width, height: height };
    }

    let text;
    if (this.textBox) {
      const width = (this.textBox.width ?? 0) * (this.textBox.scaleX ?? 1);
      const height = (this.textBox.height ?? 0) * (this.textBox.scaleY ?? 1);
      text = { x: this.textBox.left, y: this.textBox.top, width: width, height: height, text: this.text_b };
    }

    let WordPosition;

    if (this.WordPosition) {
      const width = (this.WordPosition.width ?? 0) * (this.WordPosition.scaleX ?? 1);
      const height = (this.WordPosition.height ?? 0) * (this.WordPosition.scaleY ?? 1);
      WordPosition = { x: this.WordPosition.left, y: this.WordPosition.top, width: width, height: height };
    }


    this.textBox = undefined;
    this.name1 = undefined;
    this.name2 = undefined;
    this.textPosition = undefined;
    this.percentagePosition = undefined;
    this.WordPosition = undefined;
    this.text_b = '';
    this.isactive = false;

    // this.squares = [];

    this.frames.push({ flame_word: this.flamei, name1Position: name1, frame_size: { width: this.width, height: this.height }, name2Position: name2, percentagePosition, textPosition, WordPosition, textFlames: text });

    this.canvas?.clear();

    console.log(this.frames)


  }




  addTextBox(top = 100, left = 100, widht = 100, height = 100) {
    if (!this.canvas) {
      console.error('Canvas not initialized.');
      return;
    }



    const text = new fabric.Rect({
      left: left,
      top: top,
      width: widht,
      height: height,
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: 'green',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });

    if (this.textBox) {
      this.canvas.remove(this.textBox);
    }
    this.canvas.add(text);
    this.textBox = text;
  }


  ngAfterViewInit() {

    this.startcan();
  }

  startcan() {
    setTimeout(() => {
      this.canvas = new fabric.Canvas(this.canvasContainer.nativeElement);
      this.setSize();
      this.canvas.on('object:modified', this.logSquareProperties.bind(this));
    }, 100)
  }


  addTextpos() {
    const text = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 50,
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: 'green',
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
  addname1() {
    const text = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 50,
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: 'red',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });

    if (this.name1) {
      this.canvas?.remove(this.name1)
    }
    this.canvas?.add(text);
    this.name1 = text;
  }
  addname2() {
    const text = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 50,
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: 'red',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });

    if (this.name2) {
      this.canvas?.remove(this.name2)
    }
    this.canvas?.add(text);
    this.name2 = text;
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

    if (this.percentagePosition) {
      this.canvas?.remove(this.percentagePosition);
    }

    this.canvas?.add(text);
    this.percentagePosition = text;
  }


  addWordPos() {
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

    if (this.WordPosition) {
      this.canvas?.remove(this.WordPosition);
    }
    this.canvas?.add(text);
    this.WordPosition = text;
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

    console.log(this.name1);

  }


  langg: any[] = []



  ngOnInit() {
    // this.getAll();
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });

  }

  // getAll() {

  //   this.perType.getAll().subscribe(r => { this.data = r; console.log(this.data) });

  // }

  submit() {


    this.nameing.add(this.frames, this.description, this.language, this.thumb, this.type, this.file, this.facts, this.meanings, this.percentageTexts, this.isActive).subscribe(frame => {
      console.log(frame); this.close();

    });
  }



  setUpdate(data: any) {
    this.question = data.question;
    this.idToUpdate = data._id;
    this.frames = data.frames;


    this.showUpdateButton = true;


  }


  deleteFrame(i: any) {
    this.frames.splice(i, 1);
  }

  close() {
    location.reload();
  }
  trackByFn(index: any, item: any) {
    return index;
  }

}
