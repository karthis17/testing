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

  ngOnInit() {

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
    this.fun.addQuestion(this.question, this.options).subscribe(data => { console.log(data) })
  }


  play(data: any) {
    this.ques = data;
  }

  trackByFn(index: any, item: any) {
    return index;
  }



}
