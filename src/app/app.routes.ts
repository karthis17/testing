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
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reels', component: ReelsComponent, canActivate: [AuthGuard] },
    { path: 'feeds', component: FeedComponent, canActivate: [AuthGuard] },
    { path: 'quizzes', component: QuizzeComponent, canActivate: [AuthGuard] },
    { path: 'poll', component: PollComponent, canActivate: [AuthGuard] },
    { path: 'fun-quizzes', component: FunQuizzesComponent, canActivate: [AuthGuard] },
    { path: 'frames', component: FramesComponent, canActivate: [AuthGuard] },
    { path: 'flames', component: FlamesComponent, canActivate: [AuthGuard] },
    { path: 'friend-love-calc', component: CalcComponent, canActivate: [AuthGuard] },
    { path: 'name-mean-fact', component: NameComponent, canActivate: [AuthGuard] },
    { path: 'pick-kick', component: PickNdKickComponent, canActivate: [AuthGuard] },
    { path: 'guess', component: GuessComponent, canActivate: [AuthGuard] },
    { path: 'riddles', component: RiddlesComponent, canActivate: [AuthGuard] },
    { path: 'randome-image', component: RandomImageComponent, canActivate: [AuthGuard] },
    { path: 'randome-text', component: RandomTextComponent, canActivate: [AuthGuard] },
    { path: 'percentage-type', component: PercentageTypeComponent, canActivate: [AuthGuard] },
];
