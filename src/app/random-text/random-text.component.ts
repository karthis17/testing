import { Component } from '@angular/core';
import { RandomImageService } from '../service/random-image.service';
import { RandomTextService } from '../service/random-text.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-random-text',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './random-text.component.html',
  styleUrl: './random-text.component.css'
})
export class RandomTextComponent {

  constructor(private perType: RandomTextService) { }


  data: any;

  comments: any[] = [];

  texts: string[] = [''];

  question = "";

  range!: number;
  play: any;
  ress: any;

  file: any;

  showUpdateButton: boolean = false;
  idToUpdate: any;

  ngOnInit() {
    this.getAll();
  }

  getAll() {

    this.perType.getAll().subscribe(r => { this.data = r; console.log(this.data) });

  }

  addFile(e: any) {
    this.file = e.target.files[0];
  }

  submit() {
    this.perType.addQuestion(this.question, this.texts).subscribe(frame => { console.log(frame); this.getAll(); this.close() });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  setUpdate(data: any) {
    this.question = data.question;
    this.texts = data.texts;
    this.idToUpdate = data._id;

    this.showUpdateButton = true;
  }

  close() {
    location.reload();
  }

  update() {
    this.perType.update(this.question, this.texts, this.idToUpdate).subscribe(message => { console.log(message); this.getAll() })
  }

  start(id: any) {
    this.perType.getQuestion(id).subscribe((data: any) => this.play = data)
  }

  like(id: any) {
    this.perType.like(id).subscribe(data => { console.log(data); this.getAll() })
  }

  share(id: any) {
    this.perType.share(id).subscribe(data => { console.log(data); this.getAll() });
  }

  comm(id: any, index: any) {
    this.perType.commet(id, this.comments[index]).subscribe(data => { console.log(data); this.getAll() });
  }

  delete(id: any) {
    this.perType.delete(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

}
