import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'testing';
  open = true;
  contents = [
    { text: "Reels", link: "/reels" },
    { text: "Feeds", link: "/feeds" },
    { text: "Poll", link: "/poll" },
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
    { text: "Random image", link: "/randome-image" },
    { text: "Random Text", link: "/randome-text" },
    { text: "Percentage Type", link: "/percentage-type" },
    { text: "General Question", link: "/general-question" },
  ]

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  onLogout() {
    this.authService.logOut();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}
