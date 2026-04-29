import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { Notfound } from './core/notfound/notfound';

export const routes: Routes = [
    {'path': '', component: Home},
    {'path': 'home', component: Home},
    {'path': '**', component: Notfound}
];
