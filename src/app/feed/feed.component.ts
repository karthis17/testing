import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedService } from '../service/feed.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {


  constructor(private feeds: FeedService) { }

  title!: string;
  discription!: string;
  category!: string;
  data: any;
  comment: any[] = [];

  file!: File;

  addFile(e: any): void {
    this.file = e.target.files[0];
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.feeds.getAll().subscribe(data => { this.data = data });

  }

  submit() {
    console.log(this.file, this.discription, this.category, this.title)
    this.feeds.addFeed(this.file, this.discription, this.category, this.title).subscribe(data => { console.log(data); this.getAll() })
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

}
