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
  comment: any[] = [];
  showUpdateButton: boolean = false;

  file!: File;

  fileUrl!: string;
  filePath!: string;
  id: any;

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Title: { text: string, lang: string }[] = [
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

  Discription: { text: string, lang: string }[] = [
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

  addFile(e: any): void {
    this.file = e.target.files[0];
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.comment = [];
    this.reelsService.getAll().subscribe(data => { console.log(data); this.data = data });

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

  }

  update() {
    this.reelsService.updateReel(this.file, this.discription, this.category, this.hashtags.split('#').slice(1), this.title, this.fileUrl, this.filePath, this.id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

}
