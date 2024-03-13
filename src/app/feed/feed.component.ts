import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedService } from '../service/feed.service';
import { ImageServiceService } from '../service/image-service.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {


  constructor(private feeds: FeedService, private languagee: LanguageService) { }

  title!: string;
  discription!: string;

  data: any;
  comment: any[] = [];
  showUpdateButton: boolean = false;

  categoryOptions: any;

  file!: File;

  isActive: boolean = false;
  imageUrl!: string;
  imagePath!: string;
  id: any;


  language: any;
  ress: any;

  langg: any[] = []

  category: any = "";


  addFile(e: any): void {
    this.file = e.target.files[0];
  }

  ngOnInit(): void {
    this.getAll();

    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });

  }

  getAll() {
    this.feeds.getAll().subscribe(data => { this.data = data; console.log(data) });

  }


  submit() {
    console.log(this.file, this.discription, this.category, this.title)
    this.feeds.addFeed(this.file, this.isActive, this.discription, this.category, this.title, this.language).subscribe(data => { console.log(data); this.getAll(); this.close() })
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
    this.feeds.delete(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  setUpdate(data: any) {

    this.showUpdateButton = true;
    console.log(data)
    this.title = data.title;
    this.discription = data.description;
    this.category = data.category;
    this.imageUrl = data.fileUrl;
    this.id = data._id;

    this.language = data.language;


  }

  update() {
    this.feeds.updateFeed(this.file, this.discription, this.category, this.title, this.imageUrl, this.language, this.id, this.isActive).subscribe(data => {
      console.log(data); this.getAll(); this.close()
    })
  }

  close() {
    location.reload();
  }

  publish(id: any) {
    this.feeds.publish(id).subscribe(data => this.getAll())
  }

  draft(id: any) {
    this.feeds.draft(id).subscribe(data => this.getAll());
  }

}
