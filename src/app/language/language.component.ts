import { Component } from '@angular/core';
import { LanguageService } from '../service/language.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent {

  constructor(private languageService: LanguageService) { }

  language!: string;
  native!: string;


  categoyNative: any[] = [{
    category: 'Reels',
    inNative: ''
  }, {
    category: 'Feeds',
    inNative: ''
  }, {
    category: 'Quizzes',
    inNative: ''
  }, {
    category: 'Fan Quizzes',
    inNative: ''
  }, {
    category: 'Fun Test',
    inNative: ''
  }, {
    category: 'Name Test',
    inNative: ''
  }, {
    category: 'Polls',
    inNative: ''
  }, {
    category: 'Frames',
    inNative: ''
  }, {
    category: 'Pick One Kick One',
    inNative: ''
  }, {
    category: 'guess Game',
    inNative: ''
  }, {
    category: 'Contest Quiz',
    inNative: ''
  }, {
    category: 'GK Question',
    inNative: ''
  }, {
    category: 'riddle',
    inNative: ''
  }]

  submit() {

    this.languageService.addLanguage(this.language, this.native, this.categoyNative).subscribe(data => {
      console.log(data);
      this.language = '',
        this.native = ''
    });

  }



}
