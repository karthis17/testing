import { Component } from '@angular/core';
import { GuessService } from '../service/guess.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.css'
})
export class GuessComponent {

  constructor(private guesss: GuessService) { }

  question!: any;


  questioni: any;
  optioni: any;

  questionType: string = "text";

  optionType: string = "text";

  options: any[] = ['', ''];

  answer!: any;

  data: any;

  ques: any;

  showUpdateButton: boolean = false;

  result: any;

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Oplangg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDifLang: { text: string, lang: string }[] = [

  ];

  addQuestionLanguage(lang: any) {
    this.questionDifLang.push({ text: '', lang: lang });
    // Find the index of the value to remove
    let indexToRemove = this.langg.indexOf(lang);

    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.langg.splice(indexToRemove, 1);
    }
    console.log(this.questionDifLang)
    this.optioni = 'n'
  }

  id = 1;

  optionss = [{
    lang: 'english', data: [{ _id: 0, text: '' }]
  },
  ]

  addOptionss() {
    this.optionss = this.optionss.map(option => {
      option.data.push({ _id: this.id, text: " " });
      console.log(option)
      return option;
    });
    this.id++;
  }

  addOptionsLanguage(lang: any) {
    let data: any = []
    this.optionss[0].data.map(option => {
      data.push({ _id: option._id, text: ' ' });
    })

    this.optionss.push({
      lang: lang, data: data
    })

    console.log(lang, this.optionss)
    let indexToRemove = this.Oplangg.indexOf(lang);
    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.Oplangg.splice(indexToRemove, 1);
    }
    console.log(this.questionDifLang)
    this.questioni = 'n'
  }



  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.guesss.getAll().subscribe(guess => {
      this.data = guess;
    })
  }

  addQuestion(e: any) {
    this.question = e.target.files[0];
  }

  addOptions(e: any, index: any) {
    let f: File = e.target.files[0];
    let timestamp = new Date().getMinutes() + '-' + new Date().getMilliseconds();
    let baseName = "file";
    let newName = baseName + '_' + timestamp + `.${f.type.split('/')[1]}`;

    this.options[index] = new File([f], newName, { type: f.type });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  // setAnswer(index: any) {
  //   this.answer = this.options[index].name
  //   if (!this.answer) this.answer = this.options[index]
  // }

  play(data: any) {
    this.ques = data;
  }

  submit() {
    this.guesss.addQuestion(this.question, this.answer, this.options, this.questionType, this.optionType, this.optionss, this.questionDifLang.filter(dis => { if (dis.text) return dis; else return false })).subscribe(response => { console.log(response), this.getAll() })
  }

  delete(id: any) {

    // this.servic.delete(id).subscribe((data: any) => { console.log(data); this.getAl() })
    this.guesss.delete(id).subscribe((data: any) => {
      console.log(data); this.getAll()
    });
  }
  setUpdate(data: any) {
    //     console.log(data);
    // this.options = data.option
    //     this.id = data._id;
    //     this.filePath = data.filePath;
    //     this.showUpdateButton = true;
    //     this.uploadedImage = data.question;
    //     this.question = data.question;
    this.question = data.question;
    this.options = data.options.map((option: any) => { return option.option });
  }

  close() {
    // this.option1 = ''
    // this.option2 = '';
    // this.point1 = 0;
    // this.point2 = 0;
    // this.id = '';
    // this.filePath = '';
    // this.showUpdateButton = false;
    // this.uploadedImage = '';
    // this.question = '';
  }

  update() {
    // this.servic.update(this.id, this.option1, this.option2, this.point1, this.point2, this.question, this.filePath).subscribe(data => {
    //   console.log(data);
    //   this.getAl()
    // })
  }

}
