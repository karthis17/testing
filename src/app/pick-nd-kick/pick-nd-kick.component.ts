import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickKickService } from '../service/pick-kick.service';

@Component({
  selector: 'app-pick-nd-kick',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pick-nd-kick.component.html',
  styleUrl: './pick-nd-kick.component.css'
})
export class PickNdKickComponent {

  constructor(private servic: PickKickService) { }

  question: any;

  option1!: string;
  option2!: string;
  point1!: number;
  point2!: number;

  score!: number;

  showOption: any;

  all: any[] = [];

  ngOnInit(): void {
    this.servic.getAll().subscribe((data: any) => {
      this.all = data;
    });
  }

  addFile(e: any) {
    this.question = e.target.files[0];
  }

  submit() {
    this.servic.addQuestion(this.question, this.option1, this.option2, this.point1, this.point2).subscribe(data => { console.log(data); });
  }

  showOtions(data: any) {
    this.showOption = data;
  }

  play(id: any, option: any) {
    this.servic.play(id, option).subscribe((data: any) => { console.log(data); this.score = data.point });
  }

}
