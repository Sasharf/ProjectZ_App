import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlantListPage } from './plant-list';

@NgModule({
  declarations: [
    PlantListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlantListPage),
  ],
})
export class PlantListPageModule {}
