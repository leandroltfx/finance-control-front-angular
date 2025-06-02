import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user-registration',
        loadComponent: () =>import('./features/user-registration/user-registration.component').then(m => m.UserRegistrationComponent)
    }
];
