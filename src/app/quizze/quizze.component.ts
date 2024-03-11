import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageServiceService } from '../service/image-service.service';
import { fabric } from 'fabric';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-quizze',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizze.component.html',
  styleUrl: './quizze.component.css'
})
export class QuizzeComponent {
  selected_option!: number;
  file: any;
  score: number = 0;
  data!: any;

  quizzes!: any[];

  questionType: string = "text";

  optionType: string = "text";

  langg: any[] = [];

  imageQuestion: any[] = [];

  image: any = 0;


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
      scoreCoordinates: { x: 0, y: 0, width: 0, height: 0 } as { x: any, y: any, width: number, height: number },
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
      scoreCoordinates: { x: 0, y: 0, width: 0, height: 0 } as { x: any, y: any, width: number, height: number },

    })
  }


  constructor(private im: ImageServiceService, private language: LanguageService, private cdr: ChangeDetectorRef) { }



  ngOnInit() {

    this.im.getQuizzes().subscribe((data: any) => {
      this.quizzes = data;
    });
    this.language.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });


  }


  // selected_file(event: any, state: any = null, index: any = 0): void {
  //   if (state === 1) {
  //     let p = event.target.files[0];
  //     this.quizze.state1[index]['option'] = p;
  //   }
  //   else if (state === 2) {
  //     this.quizze.state2[index]['option'] = event.target.files[0];
  //   } else if (state === 3) {
  //     this.quizze.state3[index]['option'] = event.target.files[0];
  //   } else {
  //     this.quizze.question = event.target.files[0];
  //   }
  // }

  // addFileRes(e: any, index: number) {
  //   this.quizze.result[index].resultImg = e.target.files[0];
  // }

  // setHowManyOptions() {
  //   const selected_value = this.selected_option;
  //   console.log(selected_value);
  //   for (let i = 0; i < selected_value; i++) {
  //     this.quizze.state1[i] = { option: '', point: 1 };
  //     this.quizze.state2[i] = { option: '', point: 1 };
  //     this.quizze.state3[i] = { option: '', point: 1 };
  //     this.quizze.result[i] = {
  //       resultImg: '',
  //       maxScore: 2,
  //       minScore: 1
  //     }
  //     console.log(this.quizze);
  //   }
  // }

  // showQuizzes(id: any) {
  //   this.data = this.quizzes.find(q => q._id === id);
  //   console.log(this.data);
  // }

  // submit() {
  //   console.log(this.quizze)
  //   this.im.upload(this.quizze, this.questionType, this.optionType);
  // }

  // submitText() {
  //   this.im.addTextQuizzes(this.quizze.question, this.quizze.state1, this.quizze.state2, this.quizze.state3, this.quizze.result).subscribe(data => {
  //     console.log(data);
  //   })
  // }

  showRes() {
    this.im.result(this.data._id, this.score).subscribe(res => {
      console.log(res);
    })
  }

  submit() {
    this.im.upload(this.quizze).subscribe(res => { console.log(res); });

  }

}
