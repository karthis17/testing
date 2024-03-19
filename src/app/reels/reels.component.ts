import { Component } from '@angular/core';
import { ReelsService } from '../service/reels.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../service/image-service.service';
import { LanguageService } from '../service/language.service';
import { SubcategoryComponent } from '../subcategory/subcategory.component';

@Component({
  selector: 'app-reels',
  standalone: true,
  imports: [FormsModule, CommonModule, SubcategoryComponent],
  templateUrl: './reels.component.html',
  styleUrl: './reels.component.css'
})
export class ReelsComponent {


  constructor(private reelsService: ReelsService, private Category: ImageServiceService, private languagee: LanguageService) { }

  title!: string;
  discription!: string;
  category!: string;
  categoryOptions: any;
  data: any;
  comment: any[] = [];
  showUpdateButton: boolean = false;

  isActive: boolean = false;

  file!: File;

  fileUrl!: string;
  filePath!: string;
  id: any;

  language: any;
  thub: any;
  langg: any[] = []

  addFile(e: any): void {
    this.file = e.target.files[0];
  }

  addThumbnail(e: any): void {
    this.thub = e.target.files[0];

  }

  setSubCategory(e: any) {
    this.subCategory = e;
  }

  subCategory: any;
  ngOnInit(): void {
    this.getAll();
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });

  }

  getAll() {
    this.comment = [];

    this.reelsService.getAll().subscribe((data) => {
      console.log(data);
      this.data = data;

    }, (err) => { console.log(err) });

  }


  submit() {
    this.reelsService.addReel(this.file, this.discription, this.category, this.title, this.language, this.isActive, this.thub).subscribe(data => { console.log(data); this.getAll() })
  }



  delete(id: any) {
    this.reelsService.deleteReel(id).subscribe(data => {
      console.log(data); this.getAll();
    })
  }

  setUpdate(data: any) {

    this.showUpdateButton = true;
    console.log(data)
    this.title = data.title;
    this.discription = data.description;
    this.category = data.category;
    this.fileUrl = data.fileUrl;
    this.id = data._id;
    this.thub = data.thumbnail;

    this.language = data.language;


  }

  update() {
    this.reelsService.updateReel(this.file, this.discription, this.subCategory, this.title, this.fileUrl, this.language, this.id, this.isActive, this.thub).subscribe(data => {
      console.log(data); this.getAll(); this.close()
    })
  }

  close() {
    location.reload();
  }


  publish(id: any) {
    this.reelsService.publish(id).subscribe(data => this.getAll())
  }

  draft(id: any) {
    this.reelsService.draft(id).subscribe(data => this.getAll());
  }

}
