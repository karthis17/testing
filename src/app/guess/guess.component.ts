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

  question!: File;

  options: any[] = ['', ''];

  answer!: any;

  data: any;

  ques: any;

  result: any;

  ngOnInit(): void {
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

  setAnswer(index: any) {
    this.answer = this.options[index].name
  }

  play(data: any) {
    this.ques = data;
  }

  submit() {
    this.guesss.addQuestion(this.question, this.answer, this.options).subscribe(response => { console.log(response) })
  }

}
