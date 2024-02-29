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

  ngOnInit() {
    this.getAll();
  }

  getAll() {

    this.perType.getAll().subscribe(r => { this.data = r; console.log(this.data) });

  }

  submit() {
    this.perType.addQuestion(this.question, this.result).subscribe(frame => { console.log(frame); this.getAll(); this.close() });
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
