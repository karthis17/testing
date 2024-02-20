import { Component, Input, SimpleChanges } from '@angular/core';
import { ImageServiceService } from '../service/image-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  @Input() category!: string;
  @Input() sub_category: string | null = null;

  src!: string;
  selectedFile: File | null = null;
  file: string = "";
  user: any;
  post!: any[];
  comment: any[] = []

  constructor(private imageService: ImageServiceService) { }

  ngOnInit(): void {
    this.imageService.getUsers().subscribe((users) => {
      this.user = users;
    });
    this.getPostt()

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] || changes['sub_category']) {
      this.getPostt()
    }
  }

  getPostt() {
    this.imageService.getPost(this.category, this.sub_category).subscribe((post: any) => {
      this.post = post;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {

    this.imageService.uploadImage(this.selectedFile, this.file, this.category, this.sub_category).subscribe(
      (response: any) => {
        this.src = response.imageUrl;

        console.log('Image uploaded successfully', response);
        this.getPostt()

        // Handle the server response as needed
      },
      error => {
        console.error('Error uploading image', error);
        // Handle the error
      }
    );

  }

  like(id: any) {
    this.imageService.like(id).subscribe(res => {
      console.log(res);
    })
  }


  share(id: any) {
    this.imageService.share(id).subscribe(data => { console.log(data); this.getPostt() });
  }

  comm(id: any, index: any) {
    this.imageService.commet(id, this.comment[index]).subscribe(data => { console.log(data); this.getPostt() });
  }
}
