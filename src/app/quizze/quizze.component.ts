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
    this.im.upload(this.quizze.question, this.quizze.state1, this.quizze.state2, this.quizze.state3, this.quizze.result);
  }

  showRes() {
    this.im.result(this.data._id, this.score).subscribe(res => {
      console.log(res);
    })
  }

}
