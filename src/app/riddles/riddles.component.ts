import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RiddlesService } from '../service/riddles.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-riddles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './riddles.component.html',
  styleUrl: './riddles.component.css'
})
export class RiddlesComponent {

  constructor(private riddlesService: RiddlesService, private lanua: LanguageService) { }

  langg: any[] = [];

  riddles: any[] = [];

  showUpdateButton = false;

  idToUpdate: any;

  addFile(e: any) {
    this.quizze.referenceImage = e.target.files[0];
  }

  quizze = {
    questions: [{
      question: '',
      questionType: 'text',
      optionType: 'text',
      options: [] as any[],
      hasOption: false,
    }],
    language: 'english',
    category: '',
    subCategory: '',
    isActive: false,
    description: '',
    referenceImage: '',
  }


  addImgQuestion(e: any, i: any) {
    this.quizze.questions[i].question = e.target.files[0];
  }

  addImgOp(e: any, i: any, j: any) {
    this.quizze.questions[i].options[j].option = e.target.files[0];
  }


  addQuestion() {
    this.quizze.questions.push({
      question: '',
      questionType: 'text',
      optionType: 'text',
      hasOption: false,

      options: []
    })
  }

  addoption(i: any) {
    this.quizze.questions[i].options.push({
      option: '',
      points: 0
    })
  }
  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.riddlesService.getAll().subscribe((riddles: any) => { console.log(riddles); this.riddles = riddles });
    this.lanua.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });



  }
  submit() {

    this.riddlesService.addRiddle(this.quizze).subscribe((data: any) => { console.log(data) })

  }




  // delete(id: any) {
  //   this.riddlesService.deleteRiddle(id).subscribe(data => {
  //     console.log(data); this.getAll();
  //   })
  // }

  setUpdate(data: any) {
    this.quizze = data;
    this.idToUpdate = data._id
    this.showUpdateButton = true;
  }

  update() {
    this.riddlesService.updateRiddle(this.quizze, this.idToUpdate).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  close() {
    location.reload();
  }

  publish(id: any) {
    this.riddlesService.publish(id).subscribe(data => this.getAll())
  }

  draft(id: any) {
    this.riddlesService.draft(id).subscribe(data => this.getAll());
  }


}
