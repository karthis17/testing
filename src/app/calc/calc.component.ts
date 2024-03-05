import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalcService } from '../service/calc.service';
import { max } from 'rxjs';

@Component({
  selector: 'app-calc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.css'
})
export class CalcComponent {


  constructor(private ca: CalcService) { }

  textList: string[] = [''];
  selectedType: string = 'love';
  file!: File | string;
  min: number = 0;
  max: number = 0;
  name1!: string;
  name2!: string;
  friendCalc: any;
  loveCalc: any;
  id: any;
  result: any;

  filePath!: string;
  showUpdateButton: boolean = false;

  trackByFn(index: any, item: any) {
    return index;
  }


  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }

  ngOnInit() {
    this.getAll()
  }

  addFile(e: any) {
    let f: File = e.target.files[0];
    let timestamp = new Date().getTime(); // Get current timestamp
    let baseName = "file"; // Base name for the file
    let newName = baseName + '_' + timestamp + ".png"; // Concatenate base name with timestamp and extension
    this.file = new File([f], newName, { type: f.type });
    // Now you can use modifiedFile which has the new unique name
    console.log(this.file); // e.g., "file_1644944795000.png"
  }

  getAll() {
    this.ca.getFriendCalc().subscribe(data => {
      console.log(data);
      this.friendCalc = data;
    });
    this.ca.getLoveCalc().subscribe(data => {
      this.loveCalc = data;
    });
  }

  submit() {

    console.log(this.textList, "l")
    console.log(this.file)
    console.log(this.min)
    console.log(this.max)



    this.ca.addLove(this.textList, this.min, this.max, this.file, this.thumb).subscribe(data => { console.log(data); this.close() })
  }
  submitFr() {
    console.log(this.textList, "fr")
    console.log(this.file)
    console.log(this.min)
    console.log(this.max)

    this.ca.addFriend(this.textList, this.min, this.max, this.file, this.thumb).subscribe(data => { console.log(data), this.getAll() })
  }


  calculateLove() {
    this.ca.calLove(this.name1, this.name2).subscribe(data => { console.log(data); this.result = data; });
  }

  calculateFriendship() {
    this.ca.calcFriendship(this.name1, this.name2).subscribe(data => { this.result = data; console.log(data); })
  }

  setUpdate(data: any, loveCalc = false) {
    if (loveCalc) {
      this.selectedType = 'love';
    } else {
      this.selectedType = 'friend';
    }
    this.showUpdateButton = true;
    this.id = data._id;
    this.file = data.resultImage;
    this.filePath = data.filePath;
    this.min = data.minPercentage;
    this.max = data.maxPercentage;
    this.textList = data.text;
  }

  close() {
    this.showUpdateButton = false;
    this.id = '';
    this.file = '';
    this.filePath = '';
    this.min = 0;
    this.max = 0;
    this.textList = [''];
  }

  update() {
    if (this.selectedType === 'love') {
      this.ca.updateLoveCalc(this.textList, this.min, this.max, this.file, this.filePath, this.id).subscribe(data => { console.log(data); this.getAll() })
    } else {
      this.ca.updateFriendCalc(this.textList, this.min, this.max, this.file, this.filePath, this.id).subscribe(data => { console.log(data); this.getAll() })

    }
  }


  delete(id: any, lovwCalc = false) {
    if (lovwCalc) {
      this.ca.deleteLoveCalc(id).subscribe(data => { console.log(data); this.getAll() });
    } else {
      this.ca.deleteFriendCalc(id).subscribe(data => { console.log(data); this.getAll() });
    }
  }

}
