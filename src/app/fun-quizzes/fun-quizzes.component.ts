import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FunQuizzesService } from '../service/fun-quizzes.service';

@Component({
  selector: 'app-fun-quizzes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fun-quizzes.component.html',
  styleUrl: './fun-quizzes.component.css'
})
export class FunQuizzesComponent {

  constructor(private fun: FunQuizzesService) { }

  question!: any;
  answer!: any;
  options: any[] = [{ option: '', answer: false }];
  data: any;
  ques: any;
  result: any;
  last: any;
  id: any;
  showUpdateButton: boolean = false;

  questioni: any;
  noOfOptions: any = [''];


  file: any;

  addFile(e: any) {
    this.file = e.target.files[0];
  }

  opID = 1;

  optionss = [{
    lang: 'english', data: [{ _id: 0, text: '' }]
  },
  ]

  addOptionsLanguage(lang: any) {
    let data: any = []
    this.optionss[0].data.map(option => {
      data.push({ _id: option._id, text: ' ' });
    })

    this.optionss.push({
      lang: lang, data: data
    })

    console.log(lang, this.optionss)
    let indexToRemove = this.langg.indexOf(lang);
    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.langg.splice(indexToRemove, 1);
    }

  }
  optioni: any

  addOptions() {
    this.optionss = this.optionss.map(option => {
      option.data.push({ _id: this.opID, text: " " });
      console.log(option)
      return option;
    });
    this.opID++;
  }

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Qulangg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDifLang: { text: string, lang: string }[] = [

  ];

  addQuestionLanguage(lang: any) {
    this.questionDifLang.push({ text: '', lang: lang });
    // Find the index of the value to remove
    let indexToRemove = this.Qulangg.indexOf(lang);

    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.Qulangg.splice(indexToRemove, 1);
    }
    console.log(this.questionDifLang)
    this.optioni = 'n'
  }



  ngOnInit() {

    this.getAll()

  }

  getAll() {
    this.fun.getAll().subscribe(fun => {
      console.log(fun);
      this.data = fun;
    })
  }

  submit() {
    console.log(this.optionss, this.question, this.answer);
    this.fun.addQuestion(this.question, this.optionss, this.answer, this.questionDifLang.filter(dis => { if (dis.text) return dis; else return false }), this.file).subscribe(data => { console.log(data); this.getAll(); this.close() })
  }


  play(data: any) {
    this.ques = data;
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  setUpdate(data: any) {
    console.log(data);
    this.options = data.options;
    this.id = data._id;
    this.showUpdateButton = true;
    this.question = data.question;

    this.options.forEach((option, i) => {
      if (option.answer) {
        this.last = i;
        this.answer = i
        console.log(this.last);
        console.log(option.answer);
        return;
      }
    })
  }

  close() {
    location.reload();
  }

  delete(id: any) {

    this.fun.delete(id).subscribe((data: any) => { console.log(data); this.getAll() })
  }

  update() {
    this.fun.update(this.id, this.question, this.options).subscribe((data: any) => { console.log(data); this.getAll() });
  }

}
