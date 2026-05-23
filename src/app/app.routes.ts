import { Routes } from '@angular/router';
import { Profile } from './components/pages/profile/profile/profile';
import { Skills } from './components/pages/skills/skills/skills';
import { Challenges } from './components/pages/challenges/challenges/challenges';
import { Dashboard } from './components/pages/dashboard/dashboard/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'skills', component: Skills },
  { path: 'challenges', component: Challenges },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: 'dashboard' }
];
