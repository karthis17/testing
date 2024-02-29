import { Component } from '@angular/core';
import { PercentageTypeService } from '../service/percentage-type.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-percentage-type',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './percentage-type.component.html',
  styleUrl: './percentage-type.component.css'
})
export class PercentageTypeComponent {

  constructor(private perType: PercentageTypeService) { }


  data: any;

  comments: any[] = [];


  question = "";
  result = [
    {
      rangeFrom: 0,
      rangeTo: 1,
      text: ''
    }
  ]

  range!: number;
  play: any;
  ress: any;

  showUpdateButton: boolean = false;
  idToUpdate: any;

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDif: { text: string, lang: string }[] = [
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


  ngOnInit() {
    this.getAll();
  }

  getAll() {

    this.perType.getAll().subscribe(r => { this.data = r; console.log(this.data) });

  }

  submit() {
    this.perType.addQuestion(this.question, this.result, this.questionDif.filter(dis => { if (dis.text) return dis; else return false })).subscribe(frame => { console.log(frame); this.getAll(); this.close() });
  }

  setUpdate(data: any) {
    this.question = data.question;
    this.result = data.result;
    this.idToUpdate = data._id;

    this.showUpdateButton = true;
  }

  close() {
    location.reload();
  }

  update() {
    this.perType.update(this.question, this.result, this.idToUpdate).subscribe(message => { console.log(message); this.getAll() })
  }

  submitAns(id: any) {
    this.perType.result(id, this.range).subscribe(result => { this.ress = result });
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
