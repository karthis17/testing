import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-category-tumbnail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category-tumbnail.component.html',
  styleUrl: './category-tumbnail.component.css'
})
export class CategoryTumbnailComponent {

  constructor(private cate: LanguageService) { }


  categoryList: any[] = [
    "quizzes",
    "fanQuizzes",
    "funTest",
    "nameTest",
    "polls",
    "pickOneKickOne",
    "ContestQuiz",
    "gkQuestion",
    "riddles"]

  categoryNames = ["Personality Quiz", "Fans Quiz", "Fun Test", "Name Test", "Polls", "Party Games", "Contest Quiz", "GK Quiz", "Riddles"];


  category: any;

  thumbnail: any;

  addthumb(e: any) {
    this.thumbnail = e.target.files[0];
  }

  submit() {
    if (this.category) {
      console.log(this.category, this.thumbnail)
      this.cate.addThum(this.thumbnail, this.category).subscribe(data => { console.log(data); location.reload(); });
    }

  }

}
