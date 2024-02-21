import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UploadComponent } from '../upload/upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageServiceService } from '../service/image-service.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [UploadComponent, CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  constructor(private auth: AuthService, private post: ImageServiceService) { }
  category!: any;
  cat: any;
  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];

  selectedCategory!: string;

  selectedLang!: string;

  title: { text: string, lang: string }[] = [
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

  setLanguage() {
    console.log(this.selectedLang)
    localStorage.setItem('lang', this.selectedLang);
    this.getCategory(this.selectedLang)
  }

  show() {
    this.auth.getUser().subscribe(user => {
      console.log(user);
    })
  }

  ngOnInit() {
    let lan = localStorage.getItem("lang")
    if (lan) {
      this.selectedLang = lan;
      this.getCategory(lan);
    } else {
      this.selectedLang = "english";
      this.getCategory("english");
    }


  }

  getCategory(lang: any) {
    this.post.getCategory(lang).subscribe(category => { this.category = category });
  }

  submit() {

    console.log(this.title.filter(tit => { if (tit.text) return tit; else return false }));

    this.post.addCategory(this.cat, this.title.filter(tit => { if (tit.text) return tit; else return false })).subscribe(category => { console.log(category) })
  }
  trackByFn(index: any, item: any) {
    return index;
  }

}
