import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { QuizzeComponent } from './quizze/quizze.component';
import { PollComponent } from './poll/poll.component';
import { FramesComponent } from './frames/frames.component';
import { FlamesComponent } from './flames/flames.component';
import { CalcComponent } from './calc/calc.component';
import { NameComponent } from './name/name.component';
import { PickNdKickComponent } from './pick-nd-kick/pick-nd-kick.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, UploadComponent, LoginComponent, RouterLink, QuizzeComponent, PollComponent, LoginComponent, FramesComponent, FlamesComponent, CalcComponent, NameComponent, PickNdKickComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'testing';

  constructor(private auth: AuthService) { }
  category!: string;
  sub_category: string | null = null;

  show_sub_category_tren: boolean = false;
  show_sub_category_new: boolean = false;

  setCategory(category: string) {
    this.sub_category = null;
    if (category === 'trending') {
      this.show_sub_category_new = this.show_sub_category_new ? false : false;

      this.show_sub_category_tren = this.show_sub_category_tren ? false : true;
    }
    else if (category === 'New') {
      this.show_sub_category_tren = this.show_sub_category_tren ? false : false;
      this.show_sub_category_new = this.show_sub_category_new ? false : true;
    }
    else {
      this.show_sub_category_tren = false;
      this.show_sub_category_new = false;
    }
    this.category = category;
  }

  show() {
    this.auth.getUser().subscribe(user => {
      console.log(user);
    })
  }

}
