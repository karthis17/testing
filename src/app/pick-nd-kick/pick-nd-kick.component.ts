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

  languages: any = "english";

  score!: number;

  showOption: any;

  showUpdateButton: boolean = false;

  id: any;
  filePath!: string;
  uploadedImage!: string;

  all: any[] = [];
  option2i: any
  option1i: any;

  langg = ["english", "tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];


  quizze = {
    questions: [{
      question: '',
      questionType: 'text',
      optionType: 'text',
      options: [{
        option: '',
        points: 0
      }]
    }],
    language: 'english',

    description: '',
    referenceImage: '',
  }


  addQuestion() {
    this.quizze.questions.push({
      question: '',
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

  addQFile(e: any, i: any) {
    this.quizze.questions[i].question = e.target.files[0];
  }

  addOFile(e: any, i: any, j: any) {
    this.quizze.questions[i].options[j].option = e.target.files[0];
  }

  addReff(e: any) {
    this.quizze.referenceImage = e.target.files[0];

  }


  ngOnInit(): void {
    this.getAl()
  }

  getAl() {
    this.servic.getAll().subscribe((data: any) => {
      this.all = data;
    });
  }



  submit() {
    this.servic.addQuestion(this.quizze).subscribe(data => { console.log(data); this.getAl() });
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

  // setUpdate(data: any) {
  //   console.log(data);
  //   this.option1 = data.options[0].option;
  //   this.option2 = data.options[1].option;
  //   this.point1 = data.options[0].point;
  //   this.point2 = data.options[1].point;
  //   this.id = data._id;
  //   this.filePath = data.filePath;
  //   this.showUpdateButton = true;
  //   this.uploadedImage = data.question;
  //   this.question = data.question;
  // }

  close() {
    location.reload();
  }

  // update() {
  //   this.servic.update(this.id, this.option1, this.option2, this.point1, this.point2, this.question, this.filePath).subscribe(data => {
  //     console.log(data);
  //     this.getAl()
  //   })
  // }

}
