import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { ReelsComponent } from './reels/reels.component';
import { FeedComponent } from './feed/feed.component';
import { QuizzeComponent } from './quizze/quizze.component';
import { PollComponent } from './poll/poll.component';
import { FunQuizzesComponent } from './fun-quizzes/fun-quizzes.component';
import { FramesComponent } from './frames/frames.component';
import { FlamesComponent } from './flames/flames.component';
import { CalcComponent } from './calc/calc.component';
import { NameComponent } from './name/name.component';
import { PickNdKickComponent } from './pick-nd-kick/pick-nd-kick.component';
import { GuessComponent } from './guess/guess.component';
import { RiddlesComponent } from './riddles/riddles.component';
import { LoginComponent } from './login/login.component';
import { RandomImageComponent } from './random-image/random-image.component';
import { PercentageTypeComponent } from './percentage-type/percentage-type.component';
import { RandomTextComponent } from './random-text/random-text.component';

export const routes: Routes = [
    { path: '', redirectTo: "/reels", pathMatch: 'full' },
    { path: 'reels', component: ReelsComponent },
    { path: 'feeds', component: FeedComponent },
    { path: 'quizzes', component: QuizzeComponent },
    { path: 'pull', component: PollComponent },
    { path: 'fun-quizzes', component: FunQuizzesComponent },
    { path: 'frames', component: FramesComponent },
    { path: 'flames', component: FlamesComponent },
    { path: 'friend-love-calc', component: CalcComponent },
    { path: 'name-mean-fact', component: NameComponent },
    { path: 'pick-kick', component: PickNdKickComponent },
    { path: 'guess', component: GuessComponent },
    { path: 'riddles', component: RiddlesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'randome-image', component: RandomImageComponent },
    { path: 'randome-text', component: RandomTextComponent },
    { path: 'percentage-type', component: PercentageTypeComponent },
];
