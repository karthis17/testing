import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedService } from '../service/feed.service';
import { ImageServiceService } from '../service/image-service.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {


  constructor(private feeds: FeedService, private Category: ImageServiceService) { }

  title!: string;
  discription!: string;
  category!: string;
  data: any;
  comment: any[] = [];
  showUpdateButton: boolean = false;

  categoryOptions: any;

  file!: File;

  imageUrl!: string;
  imagePath!: string;
  id: any;

  titlei: any = 'n';
  descriptioni: any = 'n';

  ress: any;

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  deslangg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Title: { text: string, lang: string }[] = [

  ];

  Discription: { text: string, lang: string }[] = [

  ];

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
    this.feeds.getAll().subscribe(data => { this.data = data; console.log(data) });

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
    console.log(this.file, this.discription, this.category, this.title)
    this.feeds.addFeed(this.file, this.discription, this.category, this.title, this.Discription.filter(tit => { if (tit.text) return tit; else return false }), this.Title.filter(dis => { if (dis.text) return dis; else return false })).subscribe(data => { console.log(data); this.getAll() })
  }

  like(id: any) {
    this.feeds.like(id).subscribe(data => { console.log(data); this.getAll() });
  }

  share(id: any) {
    this.feeds.share(id).subscribe(data => { console.log(data); this.getAll() });
  }
  comm(id: any, index: number) {
    this.feeds.commet(id, this.comment[index]).subscribe(data => { console.log(data); this.getAll() });
  }

  delete(id: any) {
    this.feeds.deleteFeed(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  setUpdate(data: any) {

    this.showUpdateButton = true;
    console.log(data)
    this.title = data.title;
    this.discription = data.description;
    this.category = data.category;
    this.imageUrl = data.imageUrl;
    this.imagePath = data.imagePath;
    this.id = data._id;
    this.Title = data.titleDifLang
    this.Discription = data.descriptionDifLang;

  }

  update() {
    this.feeds.updateFeed(this.file, this.discription, this.category, this.title, this.imageUrl, this.imagePath, this.id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  getCategoryWish(category: any) {
    this.feeds.getCategoryWise(category).subscribe(data => {
      this.data = data;
    });
  }

}
