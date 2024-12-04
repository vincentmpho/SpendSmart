import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'spend-smart', loadChildren: () => import('./spend-smart/spend-smart.module').then(m => m.SpendSmartModule) }
];

