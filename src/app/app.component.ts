import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'testing';

  open = true;

  contents = [
    { text: "Post", link: "/" },
    { text: "Reels", link: "/reels" },
    { text: "Feeds", link: "/feeds" },
    { text: "Pull", link: "/pull" },
    { text: "Quizzes", link: "/quizzes" },
    { text: "Fun Quizzes", link: "/fun-quizzes" },
    { text: "Frames", link: "/frames" },
    { text: "Flames", link: "/flames" },
    {
      text: "Friend love calc", link: "/friend-love-calc"
    },
    { text: "Name mean fact", link: "/name-mean-fact" },
    { text: "Guess", link: "/guess" },
    { text: "Pick Kick", link: "/pick-kick" },
    { text: "Riddles", link: "/riddles" },
    { text: "Randome image", link: "/randome-image" },
    { text: "Percentage Type", link: "/percentage-type" },
  ]


}
