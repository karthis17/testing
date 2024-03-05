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
  lani: any
  data: any;
  id: any;

  showUpdateButton: boolean = false;

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDif: { text: string, lang: string }[] = [

  ];

  answerDif: { text: string, lang: string }[] = [

  ];

  addLangg(lang: any) {
    this.questionDif.push({ text: "", lang });
    this.answerDif.push({ text: "", lang });
    let indexToRemove = this.langg.indexOf(lang);
    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.langg.splice(indexToRemove, 1);
    }
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.riddlesService.getAll().subscribe((riddles: any) => { console.log(riddles); this.riddles = riddles });

  }
  submit() {
    console.log(this.question, this.answer);
    this.riddlesService.addRiddle(this.question, this.answer, this.questionDif.filter(dis => { if (dis.text) return dis; else return false }), this.answerDif.filter(dis => { if (dis.text) return dis; else return false })).subscribe(r => console.log(r));
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

  close() {
    location.reload();
  }

}
