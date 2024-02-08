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
  state1: any[] = [];
  state2: any[] = [];
  state3: any[] = [];

  constructor(private im: ImageServiceService) { }

  selected_file(event: any, state: any = null): void {
    if (state === 1) {
      this.state1.push(event.target.files[0]);
    }
    else if (state === 2) {
      this.state2.push(event.target.files[0]);
    } else if (state === 3) {
      this.state3.push(event.target.files[0]);
    } else {
      this.file = event.target.files[0];
    }
  }

  submit() {
    console.log(this.state1, this.state2, this.state3)
    this.im.up(this.file, this.state1, this.state2, this.state3).subscribe(d => {
      console.log(d)
    })
  }

}
