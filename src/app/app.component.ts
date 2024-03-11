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
    { text: "Language", link: "/language" },
    { text: "Reels", link: "/reels" },
    { text: "Feeds", link: "/feeds" },
    { text: "Poll", link: "/poll" },
    { text: "Quizzes", link: "/quizzes" },
    { text: "Fun Quizzes", link: "/fun-quizzes" },
    { text: "Contest Quizzes", link: "/contest-quizzes" },
    { text: "Frames", link: "/frames" },
    { text: "Pick Kick", link: "/pick-kick" },
    { text: "Riddles", link: "/riddles" },
    { text: "Fun Test", link: "/funtest" },
    { text: "Nameing Type", link: "/naming-type" },
    { text: "GK Question", link: "/general-question" },
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
