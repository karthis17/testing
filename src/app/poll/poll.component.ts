import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PollService } from '../service/poll.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent {

  selectedOption: string | boolean = false;
  questionType!: string;

  textQuestion: any = "";
  imageQuestion: any = "";
  polls!: any[];
  imgOptions: any[] = [""];
  textOptions: string[] = [''];

  noOfOptions: any = [''];

  id = 1;

  language: any = "english";
  description: any;

  options: any = [{
    option: '',
    vote: 0
  }];

  thumb: any;

  addTumb(e: any) {
    this.thumb = e.target.files[0];
  }


  addOptions() {
    this.options.push({
      option: '',
      vote: 0
    });
  }

  data: any;

  resData: any;

  showVote: boolean = true;

  comment: any[] = []

  constructor(private poll: PollService, private languagee: LanguageService) { }

  questioni: any;
  optioni: any;

  langg: any[] = [];

  isActive: boolean = false;



  ngOnInit() {
    this.getData()
    this.languagee.getlanguage().subscribe((data: any) => { console.log(data); this.langg = data });

  }

  getData() {
    this.poll.getAllpoll().subscribe((data: any) => {
      console.log(data);
      this.polls = data;
    });
  }


  trackByFn(index: any, item: any) {
    return index;
  }
  checkSelectedOption(option: string) {
    this.selectedOption = option;
    if (option === 'text') {
      console.log('Text option is selected');
    } else if (option === 'image') {
      console.log('Image option is selected');
    } else {
      console.log('No option selected');
    }
  }

  addFile(e: any, index: any) {
    this.imgOptions[index] = e.target.files[0]
  }

  addQnFile(e: any) {
    this.imageQuestion = e.target.files[0]
  }

  // submit() {

  //   console.log(this.questionDifLang);
  //   console.log(this.optionss);
  //   this.poll.addPoll(this.question, this.optionss, this.questionDifLang.filter(dis => { if (dis.text) return dis; else return false }), this.thumb).subscribe(data => { console.log(data); }, err => { console.log(err); this.getData() });
  // }
  submit() {
    console.log(this.imgOptions, this.options, this.textQuestion)
    this.poll.addPoll(this.imgOptions, this.imageQuestion, this.textQuestion, this.options, this.description, this.language, this.thumb, this.questionType, this.selectedOption, this.isActive).subscribe(data => { console.log(data); }, err => { console.log(err); });
  }

  show(poll: any) {
    this.data = poll
  }



}
