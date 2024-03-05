import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlamesService } from '../service/flames.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flames',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flames.component.html',
  styleUrl: './flames.component.css'
})
export class FlamesComponent {


  constructor(private flame: FlamesService) { }

  submit() {

    this.flame.uploadFlames(this.selectedFlames, this.flamesImg, this.thumb).subscribe(flames => {
      console.log(flames);
      this.getAll()
    });

  }

  ngOnInit() {
    this.getAll()
  }

  selectedFlames: string = '';
  flamesImg: any;
  flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enmity', 'Sibling'];

  name1: string = '';
  name2: string = '';
  result: any;
  data: any;

  showButton: boolean = false;
  filePath: any;
  id: any;

  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }

  addFile(e: any) {
    this.flamesImg = e.target.files[0];
  }

  submitFlames() {
    this.flame.flamesFind(this.name1, this.name2).subscribe((flames: any) => {
      console.log(flames);
      this.result = flames;

    }
    );
  }

  getAll() {
    this.flame.getAll().subscribe(data => { this.data = data })
    this.close();
  }

  delete(id: any) {
    this.flame.delete(id).subscribe(data => { this.getAll() });
  }

  setUpdate(data: any) {
    this.showButton = true;
    this.selectedFlames = data.flamesWord;
    this.flamesImg = data.imageUrl;
    this.id = data._id;
    this.filePath = data.imagePath;
  }

  update() {

    this.flame.update(this.selectedFlames, this.flamesImg, this.filePath, this.id).subscribe(data => { console.log(data); this.getAll() });

  }

  close() {
    this.showButton = false;
    this.selectedFlames = '';
    this.flamesImg = '';
    this.id = '';
    this.filePath = '';
  }

}
