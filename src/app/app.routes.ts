import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pokemon-search', pathMatch: 'full' },
    { path:'pokemon-search', component: HomeComponent }
];
