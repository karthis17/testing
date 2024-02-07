import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, UploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testing';

  category!: string;
  sub_category: string | null = null;

  show_sub_category_tren: boolean = false;
  show_sub_category_new: boolean = false;

  setCategory(category: string) {
    this.sub_category = null;
    if (category === 'trending') {
      this.show_sub_category_new = this.show_sub_category_new ? false : false;

      this.show_sub_category_tren = this.show_sub_category_tren ? false : true;
    }
    else if (category === 'New') {

      this.show_sub_category_tren = this.show_sub_category_tren ? false : false;
      this.show_sub_category_new = this.show_sub_category_new ? false : true;
    }
    else {
      this.show_sub_category_tren = false;
      this.show_sub_category_new = false;
    }
    this.category = category;
  }

}
