import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UploadComponent } from '../upload/upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [UploadComponent, CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  constructor(private auth: AuthService) { }
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

  show() {
    this.auth.getUser().subscribe(user => {
      console.log(user);
    })
  }

}
