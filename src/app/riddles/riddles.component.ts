import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RiddlesService } from '../service/riddles.service';

@Component({
  selector: 'app-riddles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './riddles.component.html',
  styleUrl: './riddles.component.css'
})
export class RiddlesComponent {

  constructor(private riddlesService: RiddlesService) { }

  question!: string;
  answer!: string;
  user_answer!: string;

  comment: any;

  riddles: any;

  result: any;

  data: any;
  id: any;

  showUpdateButton: boolean = false;



  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.riddlesService.getAll().subscribe((riddles: any) => { console.log(riddles); this.riddles = riddles });

  }
  submit() {
    console.log(this.question, this.answer);
    this.riddlesService.addRiddle(this.question, this.answer).subscribe(r => console.log(r));
  }

  checkAnswer(id: any) {
    this.riddlesService.anser(this.user_answer, id).subscribe((r: any) => this.result = r.answer);
  }

  addComment(id: any) {
    this.riddlesService.comment(id, this.comment).subscribe((r: any) => { console.log(r); });
  }

  delete(id: any) {
    this.riddlesService.deleteRiddle(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  setUpdate(data: any) {

    this.question = data.question;
    this.answer = data.answer;
    this.id = data._id;
    this.showUpdateButton = true;
  }

  update() {
    this.riddlesService.updateRiddle(this.id, this.question, this.answer).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

}
