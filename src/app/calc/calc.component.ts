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
  selectedType!: string;
  file!: File;
  min: number = 0;
  max: number = 0;
  name1!: string;
  name2!: string;

  result: any;

  trackByFn(index: any, item: any) {
    return index;
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

  submit() {

    console.log(this.textList, "l")
    console.log(this.file)
    console.log(this.min)
    console.log(this.max)



    this.ca.addLove(this.textList, this.min, this.max, this.file).subscribe(data => { console.log(data) })
  }
  submitFr() {
    console.log(this.textList, "fr")
    console.log(this.file)
    console.log(this.min)
    console.log(this.max)

    this.ca.addFriend(this.textList, this.min, this.max, this.file).subscribe(data => { console.log(data) })
  }


  calculateLove() {
    this.ca.calLove(this.name1, this.name2).subscribe(data => { console.log(data); this.result = data; });
  }

  calculateFriendship() {
    this.ca.calcFriendship(this.name1, this.name2).subscribe(data => { this.result = data; console.log(data); })
  }

}
