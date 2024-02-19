import { Component } from '@angular/core';
import { ReelsService } from '../service/reels.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reels',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reels.component.html',
  styleUrl: './reels.component.css'
})
export class ReelsComponent {

  constructor(private reelsService: ReelsService) { }

  title!: string;
  discription!: string;
  hashtags!: string;
  category!: string;
  data: any;

  file!: File;

  addFile(e: any): void {
    this.file = e.target.files[0];
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.reelsService.getAll().subscribe(data => { this.data = data });

  }

  submit() {
    console.log(this.file, this.discription, this.category, this.hashtags.split('#'), this.title)
    this.reelsService.addReel(this.file, this.discription, this.category, this.hashtags.split('#').slice(1), this.title).subscribe(data => { console.log(data); this.getAll() })
  }

  like(id: any) {
    this.reelsService.like(id).subscribe(data => { console.log(data); this.getAll() })
  }

}
