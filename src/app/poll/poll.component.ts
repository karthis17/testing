import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PollService } from '../service/poll.service';

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

  question: any;
  polls!: any[];
  imgOptions: any[] = [""];
  textOptions: string[] = [''];

  data: any;

  resData: any;

  showVote: boolean = true;

  comment: any[] = []

  constructor(private poll: PollService) { }

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDifLang: { text: string, lang: string }[] = [
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


  ngOnInit() {
    this.getData()
  }

  getData() {
    this.poll.getAllpoll().subscribe((data: any) => {
      console.log(data);
      this.polls = data;
    });
  }

  addTextOption() {
    this.textOptions.push('');
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
    this.question = e.target.files[0]
  }

  submit() {
    this.poll.addPoll(this.question, this.textOptions, this.questionDifLang.filter(dis => { if (dis.text) return dis; else return false })).subscribe(data => { console.log(data); }, err => { console.log(err); this.getData() });
  }
  submitImg() {
    console.log(this.imgOptions)
    this.poll.addImgPoll(this.imgOptions, this.question).subscribe(data => { console.log(data); }, err => { console.log(err); });
  }

  show(poll: any) {
    this.data = poll
  }

  vote(option: any) {
    this.showVote = false;
    this.poll.votee(this.data._id, option).subscribe(data => {
      console.log(data)
      this.poll.getPollById(this.data._id).subscribe(data1 => {
        this.resData = data1;
        console.log(data1)

      });
    });
  }

  lik(poll_id: any) {
    this.poll.like(poll_id).subscribe(data => {
      console.log(data);
      this.getData()
    });
  }


  share(id: any) {
    this.poll.share(id).subscribe(data => { console.log(data); this.getData() });
  }

  comm(id: any, index: any) {
    this.poll.commet(id, this.comment[index]).subscribe(data => { console.log(data); this.getData() });
  }

}
