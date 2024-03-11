import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FunQuizzesService } from '../service/fun-quizzes.service';
import { fabric } from 'fabric'
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-fun-quizzes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fun-quizzes.component.html',
  styleUrl: './fun-quizzes.component.css'
})
export class FunQuizzesComponent {

  file: any;

  quizzes!: any[];

  questionType: string = "text";

  optionType: string = "text";

  langg: any[] = []

  imageQuestion: any[] = [];

  image: any = 0;

  showUpdateButton: Boolean = false;



  addFile(e: any) {
    this.quizze.referenceImage = e.target.files[0];
  }

  addQFile(e: any, i: any) {
    this.quizze.questions[i].imageQuestion = e.target.files[0];
  }

  addOFile(e: any, i: any, j: any) {
    this.quizze.questions[i].options[j].option = e.target.files[0];
  }

  addResImg(e: any, i: any,) {
    this.quizze.result[i].resultImg = e.target.files[0];

  }

  canvasWidth!: number;
  canvasHeight!: number;
  farmeFile!: File;

  width: number = 720;
  height: number = 720;

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

  texts_container: string[] = [];

  trackByFn(index: any, item: any) {
    return index;
  }

  @ViewChild('canvasElement') canvasContainer!: ElementRef<HTMLCanvasElement>;
  private canvas: fabric.Canvas | undefined;
  squares: fabric.Rect[] = [];
  textBox: fabric.Rect[] = [];
  scoreBox!: fabric.Rect | undefined;

  currentFrame!: number;
  handleFileInput(event: any, i: any) {
    const file = event.target.files[0];

    this.currentFrame = i;
    this.quizze.result[i].resultImg = file;
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

  }

  idToUpdate: any;



  addSquare(top = 100, left = 100, widht = 100, height = 100) {

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

  removeSquare(index: number) {
    if (index < 0 || index >= this.squares.length) {
      console.error('Invalid index:', index);
      return;
    }

    this.canvas?.remove(this.squares[index]);

    this.squares.splice(index, 1);
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

    this.canvas.add(text);
    this.textBox.push(text);
  }

  addTextpos(top: number = 100, left: number = 100, width: number = 150, height: number = 50) {
    const text = new fabric.Rect({
      left,
      top,
      width,
      height,
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: 'green',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      lockRotation: true,
    });

    if (this.scoreBox) {
      this.canvas?.remove(this.scoreBox)
    }
    this.canvas?.add(text);
    this.scoreBox = text;
  }

  removeTextBox(index: number) {
    if (index < 0 || index >= this.textBox.length) {
      console.error('Invalid index:', index);
      return;
    }

    this.canvas?.remove(this.textBox[index]);

    this.textBox.splice(index, 1);
    this.texts_container.splice(index, 1);
  }


  logSquareProperties() {
    for (const square of this.squares) {
      console.log(square);
    }
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

  saveframe() {

    let coordinates: any[] = [];
    // let textCoordinates: any[] = [];

    this.squares.map((square) => {

      const width = (square.width ?? 0) * (square.scaleX ?? 1);
      const height = (square.height ?? 0) * (square.scaleY ?? 1);
      coordinates.push({ x: square.left, y: square.top, width, height });
      this.image++

      this.canvas?.remove(square);
    });

    // this.textBox.map((text, i) => {
    //   const width = (text.width ?? 0) * (text.scaleX ?? 1);
    //   const height = (text.height ?? 0) * (text.scaleY ?? 1);
    //   let noOfName = this.texts_container[i].split(' ').filter(x => x.trim().includes('<fname'))
    //   textCoordinates.push({ x: text.left, y: text.top, width, height, text: this.texts_container[i], noOfName });

    //   this.canvas?.remove(text);
    // })

    this.squares = [];
    this.textBox = [];

    let scorePosition;

    if (this.scoreBox) {

      const width = (this.scoreBox.width ?? 0) * (this.scoreBox.scaleX ?? 1);
      const height = (this.scoreBox.height ?? 0) * (this.scoreBox.scaleY ?? 1);
      scorePosition = { x: this.scoreBox.left, y: this.scoreBox.top, width: width, height: height };
    }


    // this.scoreBox.map((square) => {

    //   const width = (square.width ?? 0) * (square.scaleX ?? 1);
    //   const height = (square.height ?? 0) * (square.scaleY ?? 1);
    //   this.quizze.result[this.currentFrame].scoreCoordinates = { x: square.left, y: square.top, width, height };
    // });


    this.scoreBox = undefined;


    this.quizze.result[this.currentFrame].coordinates = coordinates;
    this.quizze.result[this.currentFrame].scorePosition = scorePosition;
    this.quizze.result[this.currentFrame].noOfImage = this.image

    this.quizze.result[this.currentFrame].frame_size = { width: this.width, height: this.height };
    console.log(this.quizze)

    this.texts_container = [];
    this.canvas?.clear();

    this.image = 0;


  }


  quizze = {
    questions: [{
      textQuestion: '',
      imageQuestion: '',
      questionType: 'text',
      optionType: 'text',
      options: [{
        option: '',
        points: 0
      }]
    }],
    language: 'english',
    category: '',
    subCategory: '',
    description: '',
    isActive: false,
    referenceImage: '',
    result: [{
      coordinates: [] as any[],
      noOfImage: this.image,
      scorePosition: {} as any,
      frame_size: { width: 0, height: 0 },
      maxScore: 1,
      minScore: 0,
      resultImg: '',
    }]
  }


  addQuestion() {
    this.quizze.questions.push({
      textQuestion: '',
      imageQuestion: '',
      questionType: 'text',
      optionType: 'text',
      options: [{
        option: '',
        points: 0
      }]
    })
  }

  addoption(i: any) {
    this.quizze.questions[i].options.push({
      option: '',
      points: 0
    })
  }

  addResults() {
    this.quizze.result.push({
      minScore: 0,
      maxScore: 0,
      resultImg: '',
      noOfImage: this.image,
      coordinates: [] as any,
      frame_size: { width: 0, height: 0 },
      scorePosition: {} as any,

    })
  }


  constructor(private im: FunQuizzesService, private cdr: ChangeDetectorRef, private languagee: LanguageService) { }



  ngOnInit() {

    // this.im.getQuizzes().subscribe((data: any) => {
    //   this.quizzes = data;
    // });

    this.getAll()
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });

  }




  setUpdate(data: any) {
    this.quizze = data;
    this.showUpdateButton = true
    this.quizze.result = data.results;
    this.idToUpdate = data._id
    console.log(data);



  }

  setframne(result: any) {

    this.canvas?.clear();
    this.squares = [];
    this.scoreBox = undefined;

    this.width = result.frame_size.width
    this.height = result.frame_size.height

    this.setSize();
    if (this.canvas) {

      // Pre-load the image
      const img = new Image();
      img.onload = () => {
        // Create a new Fabric.js image object
        const fabricImage = new fabric.Image(img, {
          scaleX: this.width / img.width, // Scale image to cover the entire canvas
          scaleY: this.height / img.height,
          originX: 'left',
          originY: 'top',
        });

        // Add the image to the canvas background
        this.canvas?.setBackgroundImage(fabricImage, () => {
          this.canvas?.renderAll();
        });
      };
      img.src = result.resultImg;
    }


    if (result.coordinates) {
      this.addSquare(result.coordinates.y, result.coordinates.x, result.coordinates.widht, result.coordinates.height)
    }
    if (result.scorePosition) {
      this.addTextpos(result.scorePosition.y, result.scorePosition.x, result.scorePosition.widht, result.scorePosition.height)
    }


  }

  update() {

  }

  close() {

  }

  getAll() {
    this.im.all().subscribe((data: any) => { this.quizzes = data; console.log(data); });
  }

  publish(id: any) {
    this.im.publish(id).subscribe(data => this.getAll())
  }

  draft(id: any) {
    this.im.draft(id).subscribe(data => this.getAll());
  }

  submit() {
    console.log(this.quizze)
    this.im.addQuestion(this.quizze).subscribe(res => { console.log(res); });

  }
}
