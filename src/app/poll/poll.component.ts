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

  noOfOptions: any = [''];

  id = 1;

  optionss = [{
    lang: 'english', data: [{ _id: 0, text: '' }]
  },
  ]

  addOptionsLanguage(lang: any) {
    let data: any = []
    this.optionss[0].data.map(option => {
      data.push({ _id: option._id, text: ' ' });
    })

    this.optionss.push({
      lang: lang, data: data
    })

    console.log(lang, this.optionss)
    let indexToRemove = this.Oplangg.indexOf(lang);
    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.Oplangg.splice(indexToRemove, 1);
    }
    console.log(this.questionDifLang)
    this.questioni = 'n'
  }

  addOptions() {
    this.optionss = this.optionss.map(option => {
      option.data.push({ _id: this.id, text: " " });
      console.log(option)
      return option;
    });
    this.id++;
  }

  data: any;

  resData: any;

  showVote: boolean = true;

  comment: any[] = []

  constructor(private poll: PollService) { }

  questioni: any;
  optioni: any;

  langg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  Oplangg = ["tamil", "telugu", "kannada", "hindi", "malayalam", "bengali", "bhojpuri", "marathi", "panjabi", "odisha"];
  questionDifLang: { text: string, lang: string }[] = [

  ];

  addQuestionLanguage(lang: any) {
    this.questionDifLang.push({ text: '', lang: lang });
    // Find the index of the value to remove
    let indexToRemove = this.langg.indexOf(lang);

    if (indexToRemove !== -1) {
      // Use splice to remove the value at the index
      this.langg.splice(indexToRemove, 1);
    }
    console.log(this.questionDifLang)
    this.optioni = 'n'
  }


  ngOnInit() {
    this.getData()
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
    this.question = e.target.files[0]
  }

  submit() {

    console.log(this.questionDifLang);
    console.log(this.optionss);
    this.poll.addPoll(this.question, this.optionss, this.questionDifLang.filter(dis => { if (dis.text) return dis; else return false })).subscribe(data => { console.log(data); }, err => { console.log(err); this.getData() });
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
