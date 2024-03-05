import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageServiceService } from '../service/image-service.service';

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
  questioni: any;
  optioni: any;
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


  quizze = {
    question: '',
    state1: [],
    state2: [],
    state3: [],
    result: [],
  } as { question: string, state1: Array<any>, state2: Array<any>, state3: Array<any>, result: Array<any> }

  constructor(private im: ImageServiceService) { }



  ngOnInit() {

    this.im.getQuizzes().subscribe((data: any) => {
      this.quizzes = data;
    });

  }


  selected_file(event: any, state: any = null, index: any = 0): void {
    if (state === 1) {
      let p = event.target.files[0];
      this.quizze.state1[index]['option'] = p;
    }
    else if (state === 2) {
      this.quizze.state2[index]['option'] = event.target.files[0];
    } else if (state === 3) {
      this.quizze.state3[index]['option'] = event.target.files[0];
    } else {
      this.quizze.question = event.target.files[0];
    }
  }

  addFileRes(e: any, index: number) {
    this.quizze.result[index].resultImg = e.target.files[0];
  }

  setHowManyOptions() {
    const selected_value = this.selected_option;
    console.log(selected_value);
    for (let i = 0; i < selected_value; i++) {
      this.quizze.state1[i] = { option: '', point: 1 };
      this.quizze.state2[i] = { option: '', point: 1 };
      this.quizze.state3[i] = { option: '', point: 1 };
      this.quizze.result[i] = {
        resultImg: '',
        maxScore: 2,
        minScore: 1
      }
      console.log(this.quizze);
    }
  }

  showQuizzes(id: any) {
    this.data = this.quizzes.find(q => q._id === id);
    console.log(this.data);
  }

  submit() {
    console.log(this.quizze)
    // this.im.upload(this.quizze.question, this.quizze.state1, this.quizze.state2, this.quizze.state3, this.quizze.result);
  }

  submitText() {
    this.im.addTextQuizzes(this.quizze.question, this.quizze.state1, this.quizze.state2, this.quizze.state3, this.quizze.result).subscribe(data => {
      console.log(data);
    })
  }

  showRes() {
    this.im.result(this.data._id, this.score).subscribe(res => {
      console.log(res);
    })
  }

}
