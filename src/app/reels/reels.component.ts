import { Component } from '@angular/core';
import { ReelsService } from '../service/reels.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../service/image-service.service';

@Component({
  selector: 'app-reels',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reels.component.html',
  styleUrl: './reels.component.css'
})
export class ReelsComponent {


  constructor(private reelsService: ReelsService, private Category: ImageServiceService) { }

  title!: string;
  discription!: string;
  hashtags!: string;
  category!: string;
  categoryOptions: any;
  data: any;
  comment: any[] = [];
  showUpdateButton: boolean = false;

  file!: File;

  fileUrl!: string;
  filePath!: string;
  id: any;

  titlei: any = 'n';
  descriptioni: any = 'n';

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  deslangg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Title: { text: string, lang: string }[] = [];

  Discription: { text: string, lang: string }[] = [];

  addFile(e: any): void {
    this.file = e.target.files[0];
  }

  ngOnInit(): void {
    this.getAll();
    this.Category.getCategory("english").subscribe(data1 => {
      this.categoryOptions = data1;
      console.log(this.categoryOptions);
    });
  }

  getAll() {
    this.comment = [];
    this.reelsService.getAll().subscribe(data => {
      console.log(data);
      this.data = data;

    });

  }

  addTitleLanguage(lang: any) {
    this.Title.push({ text: '', lang: lang });
    // Find the index of the value to remove
    let indexToRemove = this.langg.indexOf(lang);

    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.langg.splice(indexToRemove, 1);
    }
    console.log(this.Title)
    this.titlei = 'n'
  }

  addDescLanguage(lang: any) {
    this.Discription.push({ text: '', lang: lang });
    // Find the index of the value to remove
    let indexToRemove = this.deslangg.indexOf(lang);

    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.deslangg.splice(indexToRemove, 1);
    }
    console.log(this.Discription)
    this.descriptioni = 'n'
  }

  submit() {
    console.log(this.file, this.discription, this.category, this.hashtags.split('#'), this.title)
    this.reelsService.addReel(this.file, this.Discription.filter(tit => { if (tit.text) return tit; else return false }), this.category, this.hashtags.split('#').slice(1), this.Title.filter(dis => { if (dis.text) return dis; else return false }), this.title, this.discription).subscribe(data => { console.log(data); this.getAll() })
  }

  like(id: any) {
    this.reelsService.like(id).subscribe(data => { console.log(data); this.getAll() })
  }

  share(id: any) {
    this.reelsService.share(id).subscribe(data => { console.log(data); this.getAll() });
  }

  comm(id: any, index: any) {
    this.reelsService.commet(id, this.comment[index]).subscribe(data => { console.log(data); this.getAll() });
  }

  delete(id: any) {
    this.reelsService.deleteReel(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  setUpdate(data: any) {

    this.showUpdateButton = true;
    console.log(data)
    this.title = data.title;
    this.discription = data.description;
    this.hashtags = `#${data.hashtags.join(' #')}`;
    this.category = data.category;
    this.fileUrl = data.fileUrl;
    this.filePath = data.filePath;
    this.id = data._id;
    this.Title = data.titleDifLang
    this.Discription = data.descriptionDifLang;

  }

  update() {
    this.reelsService.updateReel(this.file, this.discription, this.category, this.hashtags.split('#').slice(1), this.title, this.fileUrl, this.filePath, this.id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  getCategoryWish(category: any) {
    this.reelsService.getCategoryWise(category).subscribe(data => {
      this.data = data;
    });
  }
}
