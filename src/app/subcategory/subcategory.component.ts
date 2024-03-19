import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent {

  constructor(private cate: LanguageService) { }

  @Input()
  category!: any;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  select: any;

  setSelected(value: any) {
    this.selected.emit(value);
  }

  title: string = '';

  subThumbnail: any;

  addSubTumb(e: any) {
    this.subThumbnail = e.target.files[0];
  }

  addSub = false;

  subCategory: any[] = [];

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.cate.getSub(this.category).subscribe((subCategory: any) => this.subCategory = subCategory)
  }

  submit1() {
    console.log(this.category, this.subCategory, this.title);
    this.cate.addSubcategory(this.category, this.subThumbnail, this.title).subscribe(data => { console.log(data); this.addSub = false; this.getAll() })
  }



}
