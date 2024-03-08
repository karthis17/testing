import { Component } from '@angular/core';
import { LanguageService } from '../service/language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent {

  constructor(private languageService: LanguageService) { }

  language!: string;
  native!: string;

  submit() {

    this.languageService.addLanguage(this.language, this.native).subscribe(data => {
      console.log(data);
      this.language = '',
        this.native = ''
    });

  }



}
