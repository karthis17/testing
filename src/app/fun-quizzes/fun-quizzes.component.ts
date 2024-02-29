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

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDif: { text: string, lang: string }[] = [
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


  ngOnInit() {

    this.getAll()

  }

  getAll() {
    this.fun.getAll().subscribe(fun => {
      console.log(fun);
      this.data = fun;
    })
  }

  setAnswer(index: number): void {
    if (this.last !== undefined) {
      this.options[this.last].answer = false;
      this.options[index].answer = true;
      // console.log(this.last)
    } else {
      this.last = index;
      this.options[index].answer = true;
      // console.log(this.last)
    }
  }

  submit() {
    console.log(this.options);
    this.fun.addQuestion(this.question, this.options, this.questionDif.filter(dis => { if (dis.text) return dis; else return false })).subscribe(data => { console.log(data); this.getAll(); this.close() })
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
        document.getElementById('r' + i)?.setAttribute('checked', 'checked');
        console.log(this.last);
        console.log(option.answer);
        return;
      }
    })
  }

  close() {
    this.options = [{ option: '', answer: false }];
    this.id = '';
    this.showUpdateButton = false;
    this.question = '';
    this.last = '';
  }

  delete(id: any) {

    this.fun.delete(id).subscribe((data: any) => { console.log(data); this.getAll() })
  }

  update() {
    this.fun.update(this.id, this.question, this.options).subscribe((data: any) => { console.log(data); this.getAll() });
  }

}
