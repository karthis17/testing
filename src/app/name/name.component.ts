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

  nameMeaningData: any;
  nameFactData: any;

  showUpdateButton: boolean = false;
  showUpdateButtonf: boolean = false;

  id: any;

  constructor(private nameSer: NameService) { }

  ngOnInit() {
    this.getAll();
  }

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

  getAll() {

    this.nameSer.getNameMen().subscribe(data => { this.nameMeaningData = data });
    this.nameSer.getNameFact().subscribe(data => { this.nameFactData = data });
    this.close()
  }

  setUpdateMean(data: any) {
    this.showUpdateButton = true;

    this.letter = data.letter;
    this.meaning = data.meaning;
    this.id = data._id;

  }

  close() {
    this.showUpdateButton = false;
    this.showUpdateButtonf = false;

    this.letter = '';
    this.meaning = '';
    this.id = '';
    this.name = '';
    this.fact = '';

  }

  setUpdateFact(data: any) {
    this.showUpdateButtonf = true;

    this.name = data.name;
    this.fact = data.fact;
    this.id = data._id;

  }

  deleteMean(id: any) {
    this.nameSer.deleteNameMean(id).subscribe(data => { console.log(data); this.getAll() });
  }


  deleteFact(id: any) {
    this.nameSer.deleteNameFact(id).subscribe(data => { console.log(data); this.getAll() });
  }

  updateFact() {
    this.nameSer.updateFact(this.name, this.fact, this.id).subscribe(data => { console.log(data); this.getAll() });
  }

  updateMean() {
    this.nameSer.updateMeaning(this.letter, this.meaning, this.id).subscribe(data => { console.log(data); this.getAll() });
  }

}
