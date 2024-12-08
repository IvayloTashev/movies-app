import { Routes } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CatalogComponent } from './movies/catalog/catalog.component';
import { DetailsComponent } from './movies/details/details.component';
import { ProfileComponent } from './user/profile/profile/profile.component';
import { ErrorMessageComponent } from './core/error-message/error-message.component';
import { CreateComponent } from './movies/create/create.component';
import { EditComponent } from './movies/edit/edit/edit.component';
import { guestAuthGuard } from './guards/guest.guard';
import { userAuthGuard } from './guards/user.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HeroSectionComponent },

    { path: 'login', canActivate: [userAuthGuard], component: LoginComponent },
    { path: 'register', canActivate: [userAuthGuard], component: RegisterComponent },

    {
        path: 'catalog', children: [
            { path: '', component: CatalogComponent },
            { path: ':movieId', component: DetailsComponent }
        ]
    },

    { path: 'create', canActivate: [guestAuthGuard], component: CreateComponent },
    { path: 'edit/:movieId', canActivate: [guestAuthGuard], component: EditComponent },

    { path: 'profile', canActivate: [guestAuthGuard], component: ProfileComponent },

    { path: 'error', component: ErrorMessageComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
