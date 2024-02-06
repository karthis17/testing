import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ImageServiceService } from './service/image-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testing';
  src!: string;
  selectedFile: File | null = null;
  file: string = "";
  user: any;

  constructor(private imageService: ImageServiceService) { }

  ngOnInit(): void {
    this.imageService.getUsers().subscribe((users) => {
      this.user = users;
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile, this.file, this.user.username).subscribe(
        (response: any) => {
          this.src = response.path;

          console.log('Image uploaded successfully', response);

          // Handle the server response as needed
        },
        error => {
          console.error('Error uploading image', error);
          // Handle the error
        }
      );
    }
  }
}
