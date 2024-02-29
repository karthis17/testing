import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
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

  imageFile: File[] = [];

  frameName!: string;

  data!: any;

  comment: any[] = [];
  canvasWidth!: number;
  canvasHeight!: number;
  resIma: any;
  showUpload: any;


  width: number = 720;
  height: number = 720;

  texts_container: string[] = [];
  resTexts: any[] = [];
  id: any;

  showUpdateButton: boolean = false;

  uploadedFrameUrl: any;
  uploadedFramePath: any;

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Title: { text: string, lang: string }[] = [
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

  constructor(private cdr: ChangeDetectorRef, private frame: FramService) { }

  canvasSizeOptions: { width: number, height: number }[] = [
    { width: 720, height: 720 }, // Facebook Profile Picture (recommended)
    { width: 820, height: 312 }, // Facebook Cover Photo
    { width: 1080, height: 1080 }, // Instagram Post (square)
    { width: 1080, height: 1350 }, // Instagram Post (portrait)
    { width: 1080, height: 608 }, // Instagram Post (landscape)
    { width: 1500, height: 500 }, // Twitter Header Photo
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

  removeTextBox(index: number) {
    if (index < 0 || index >= this.textBox.length) {
      console.error('Invalid index:', index);
      return;
    }

    this.canvas?.remove(this.textBox[index]);

    this.textBox.splice(index, 1);
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

  setupload(f: any) {
    this.resTexts = f.texts.map((res: any) => {
      let fname: string[] = [];
      res.noOfName.forEach((name: string) => {
        fname.push("");
      })
      return {
        text: fname
      }
    })
    this.showUpload = f;
    console.log(this.resTexts)
  }

  ngOnInit(): void {
    this.getData();

  }


  getData() {
    this.frame.getFrames().subscribe(frames => {
      this.data = frames;
    })
  }

  addImageFile(e: any, i: number) {
    this.imageFile[i] = (e.target.files[0]);
  }


  submit() {
    let size = [];
    let textS = [];
    for (const square of this.squares) {
      const width = (square.width ?? 0) * (square.scaleX ?? 1);
      const height = (square.height ?? 0) * (square.scaleY ?? 1);
      size.push({ x: square.left, y: square.top, width, height });
    }
    let i = 0;
    for (const text of this.textBox) {
      const width = (text.width ?? 0) * (text.scaleX ?? 1);
      const height = (text.height ?? 0) * (text.scaleY ?? 1);
      textS.push({ x: text.left, y: text.top, width, height, text: this.texts_container[i++] });
    }

    this.frame.uploadFrame(this.frameName, this.farmeFile, { width: this.canvasWidth, height: this.canvasHeight }, size, textS, this.Title.filter(dis => { if (dis.text) return dis; else return false })).subscribe(frame => {
      this.squares = [];
      textS = [];
      this.texts_container = [];
      this.getData()
    })
  }

  uloadImage(frame_id: string) {
    this.frame.uploadImage(this.imageFile, frame_id, this.resTexts).subscribe((frame: any) => {
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

  trackByFn(index: any, item: any) {
    return index;
  }

  delete(id: any) {
    this.frame.delete(id).subscribe(data => { console.log(data); this.getData() });
  }

  async showUpdate(data: any) {

    this.id = data._id;

    this.showUpdateButton = true;
    this.frameName = data.frameName;
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

    this.textBox.forEach((text: fabric.Rect) => {
      this.canvas?.remove(text);
    })

    this.textBox = [];
    this.texts_container = [];
    data.texts.forEach((coord: any) => {

      this.addTextBox(coord.y, coord.x, coord.width, coord.height);
      this.texts_container.push(coord.text);
    });
  }

  close() {

    location.reload();

  }

  update() {
    let size = [];
    let textS = [];
    for (const square of this.squares) {
      const width = (square.width ?? 0) * (square.scaleX ?? 1);
      const height = (square.height ?? 0) * (square.scaleY ?? 1);
      size.push({ x: square.left, y: square.top, width, height });
    }
    let i = 0;
    for (const text of this.textBox) {
      const width = (text.width ?? 0) * (text.scaleX ?? 1);
      const height = (text.height ?? 0) * (text.scaleY ?? 1);
      textS.push({ x: text.left, y: text.top, width, height, text: this.texts_container[i++] });
    }
    console.log(this.frameName, this.farmeFile, this.canvasSizeOptions[this.size], size, textS, this.id, this.uploadedFramePath, this.uploadedFrameUrl)

    this.frame.updateFrame(this.frameName, this.farmeFile, this.canvasSizeOptions[this.size], size, textS, this.uploadedFrameUrl, this.uploadedFramePath, this.id).subscribe(data => {
      console.log(data);
      this.close()
    })
  }

}
