import { Routes } from '@angular/router';
import { HeroSectionComponent } from './shared/hero-section/hero-section.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CatalogComponent } from './catalog/catalog/catalog.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HeroSectionComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    {path: 'catalog', children: [
        {path: '', component: CatalogComponent },
        {path: ':movieId', component: DetailsComponent }
    ]},

    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'},
];
