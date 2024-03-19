import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickKickService } from '../service/pick-kick.service';
import { LanguageService } from '../service/language.service';
import { SubcategoryComponent } from '../subcategory/subcategory.component';

@Component({
  selector: 'app-pick-nd-kick',
  standalone: true,
  imports: [FormsModule, CommonModule, SubcategoryComponent],
  templateUrl: './pick-nd-kick.component.html',
  styleUrl: './pick-nd-kick.component.css'
})
export class PickNdKickComponent {

  constructor(private servic: PickKickService, private languagee: LanguageService) { }


  showUpdateButton: boolean = false;

  idToUpdate: any;


  langg: any[] = []

  data: any[] = [];


  setSubCategory(e: any) {
    this.quizze.subCategory = e;
  }

  quizze = {
    questions: [{
      textQuestion: '',
      imageQuestion: '',
      questionType: 'text',
      optionType: 'text',
      options: [{
        option: '',
      }]
    }],
    language: 'english',
    isActive: false,

    subCategory: '',
    description: '',
    referenceImage: '',
  }


  addQuestion() {
    this.quizze.questions.push({
      textQuestion: '',
      imageQuestion: '',
      questionType: 'text',
      optionType: 'text',
      options: [{
        option: '',
      }]
    })
  }

  addoption(i: any) {
    this.quizze.questions[i].options.push({
      option: '',
    })
  }

  addQFile(e: any, i: any) {
    this.quizze.questions[i].imageQuestion = e.target.files[0];
  }

  addOFile(e: any, i: any, j: any) {
    this.quizze.questions[i].options[j].option = e.target.files[0];
  }

  addReff(e: any) {
    this.quizze.referenceImage = e.target.files[0];

  }

  removeQuestion(i: any) {
    this.quizze.questions.splice(i, 1);
  }

  ngOnInit(): void {
    this.getAll()
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });

  }


  getAll() {
    this.servic.all().subscribe((data: any) => { this.data = data; console.log(data); });
  }



  submit() {
    this.servic.addQuestion(this.quizze).subscribe(data => { console.log(data); this.getAll(); this.close() });
  }

  update() {
    this.servic.update(this.quizze, this.idToUpdate).subscribe(res => { console.log(res); this.getAll(); this.close() });
  }
  setUpdate(data: any) {
    this.quizze = data;
    this.showUpdateButton = true
    this.idToUpdate = data._id




  }
  close() {
    this.quizze = {
      questions: [{
        textQuestion: '',
        imageQuestion: '',
        questionType: 'text',
        optionType: 'text',
        options: [{
          option: '',
        }]
      }],
      language: 'english',

      subCategory: '',
      description: '',
      referenceImage: '',
      isActive: false
    }
    this.showUpdateButton = false;
  }

  publish(id: any) {
    this.servic.publish(id).subscribe(data => this.getAll())
  }

  draft(id: any) {
    this.servic.draft(id).subscribe(data => this.getAll());
  }

  delete(id: any) {
    this.servic.delete(id).subscribe(data => this.getAll());
  }

}
