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

  src!: string;
  selectedFile: File | null = null;

  user: any;
  post!: any[];
  comment: any[] = []
  title!: string;
  description!: string;
  type: any = "new";

  constructor(private imageService: ImageServiceService) { }

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Title: { text: string, lang: string }[] = [
    { text: '', lang: this.langg[0] },
    { text: '', lang: this.langg[1] },
    { text: '', lang: this.langg[2] },
    { text: '', lang: this.langg[3] },
    { text: '', lang: this.langg[4] },
    { text: '', lang: this.langg[5] },
    { text: '', lang: this.langg[6] },
    { text: '', lang: this.langg[7] },
    { text: '', lang: this.langg[8] },
    { text: '', lang: this.langg[9] },
  ];

  Discription: { text: string, lang: string }[] = [
    { text: '', lang: this.langg[0] },
    { text: '', lang: this.langg[1] },
    { text: '', lang: this.langg[2] },
    { text: '', lang: this.langg[3] },
    { text: '', lang: this.langg[4] },
    { text: '', lang: this.langg[5] },
    { text: '', lang: this.langg[6] },
    { text: '', lang: this.langg[7] },
    { text: '', lang: this.langg[8] },
    { text: '', lang: this.langg[9] },
  ];

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
    this.imageService.getPost(this.category).subscribe((post: any) => {
      this.post = post;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {

    this.imageService.uploadImage(this.selectedFile, this.description, this.category, this.title, this.type, this.Discription.filter(tit => { if (tit.text) return tit; else return false }), this.Title.filter(dis => { if (dis.text) return dis; else return false })).subscribe(
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
