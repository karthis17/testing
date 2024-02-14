import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageServiceService } from '../service/image-service.service';
import { NameService } from '../service/name.service';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './name.component.html',
  styleUrl: './name.component.css'
})
export class NameComponent {

  name!: string;
  nameMean!: string;
  nameFact!: string;
  letter!: string;
  meaning!: string;
  fact!: string;
  result!: any;
  resultFact!: any;

  constructor(private nameSer: NameService) { }

  submitNameMeaning() {
    console.log(this.letter, this.meaning)
    this.nameSer.addMeaning(this.letter, this.meaning).subscribe(data => { console.log(data) });

  }

  submitNameFact() {

    this.nameSer.addFact(this.name, this.fact).subscribe(data => { console.log(data) });

  }

  getMeaning() {
    this.nameSer.findmeaning(this.nameMean).subscribe(data => { console.log(data); this.result = data });
  }

  getFact() {
    this.nameSer.findfact(this.nameFact).subscribe(data => { console.log(data); this.resultFact = data });

  }

}
