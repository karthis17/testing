import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickKickService } from '../service/pick-kick.service';

@Component({
  selector: 'app-pick-nd-kick',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pick-nd-kick.component.html',
  styleUrl: './pick-nd-kick.component.css'
})
export class PickNdKickComponent {

  constructor(private servic: PickKickService) { }

  question: any;

  option1!: string;
  option2!: string;
  point1!: number;
  point2!: number;

  score!: number;

  showOption: any;

  showUpdateButton: boolean = false;

  id: any;
  filePath!: string;
  uploadedImage!: string;

  all: any[] = [];

  ngOnInit(): void {
    this.getAl()
  }

  getAl() {
    this.servic.getAll().subscribe((data: any) => {
      this.all = data;
    });
  }

  addFile(e: any) {
    this.question = e.target.files[0];
  }

  submit() {
    this.servic.addQuestion(this.question, this.option1, this.option2, this.point1, this.point2).subscribe(data => { console.log(data); this.getAl() });
  }

  showOtions(data: any) {
    this.showOption = data;
  }

  play(id: any, option: any) {
    this.servic.play(id, option).subscribe((data: any) => { console.log(data); this.score = data.point });
  }

  delete(id: any) {

    this.servic.delete(id).subscribe((data: any) => { console.log(data); this.getAl() })
  }

  setUpdate(data: any) {
    console.log(data);
    this.option1 = data.options[0].option;
    this.option2 = data.options[1].option;
    this.point1 = data.options[0].point;
    this.point2 = data.options[1].point;
    this.id = data._id;
    this.filePath = data.filePath;
    this.showUpdateButton = true;
    this.uploadedImage = data.question;
    this.question = data.question;
  }

  close() {
    this.option1 = ''
    this.option2 = '';
    this.point1 = 0;
    this.point2 = 0;
    this.id = '';
    this.filePath = '';
    this.showUpdateButton = false;
    this.uploadedImage = '';
    this.question = '';
  }

  update() {
    this.servic.update(this.id, this.option1, this.option2, this.point1, this.point2, this.question, this.filePath).subscribe(data => {
      console.log(data);
      this.getAl()
    })
  }

}
