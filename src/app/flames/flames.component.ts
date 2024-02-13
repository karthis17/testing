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

    this.flame.uploadFlames(this.selectedFlames, this.flamesImg).subscribe(flames => {
      console.log(flames);
    });

  }

  selectedFlames: string = '';
  flamesImg!: File;
  flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enmity', 'Sibling'];

  name1: string = '';
  name2: string = '';
  result: any;

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
}
