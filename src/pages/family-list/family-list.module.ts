import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilyListPage } from './family-list';

@NgModule({
  declarations: [
    FamilyListPage,
  ],
  imports: [
    IonicPageModule.forChild(FamilyListPage),
  ],
})
export class FamilyListPageModule {}
