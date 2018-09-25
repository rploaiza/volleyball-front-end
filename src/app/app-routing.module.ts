import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { InputDialogComponent } from './home/input-dialog.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: HomeComponent.URL },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  static COMPONENTS = [
    HomeComponent,
  ];

  static DIALOGS_COMPONENTS = [
    InputDialogComponent
  ];
}
