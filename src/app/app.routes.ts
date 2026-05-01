import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { Notfound } from './core/notfound/notfound';
import { Superheroes } from './components/superheroes/superheroes';
import { Solicitud } from './components/solicitud/solicitud';

export const routes: Routes = [
    {'path': '', component: Home},
    {'path': 'home', component: Home},
    {'path': 'superheroes', component: Superheroes},
    {'path': 'solicitud', component: Solicitud},
    {'path': '**', component: Notfound}
];
