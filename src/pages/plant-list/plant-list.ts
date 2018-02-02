import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlantsProvider } from '../../providers/providers';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-plant-list',
  templateUrl: 'plant-list.html',
})
export class PlantListPage {

  familyName: any;
  plants: Item[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private plantProvider: PlantsProvider,
    public modalCtrl: ModalController) {

    this.familyName = navParams.get('familyName');
    console.log(this.familyName)
    this.getPlants();

  }

  getPlants() {
    if (this.familyName) {
      this.plantProvider.getPlantsByFamily(this.familyName).subscribe(data => {
        if (data["success"]) {
          this.plants = data["answer"];
        }
      });
    }
    else {
      this.plantProvider.getPlants().subscribe(data => {
        if (data["success"]) {
          this.plants = data["answer"];
        }
      });
    }
  }

  addItem() {
    let addModal = this.modalCtrl.create('PlantAddPage');
    addModal.onDidDismiss(() => {
      this.getPlants();
    })
    addModal.present();
  }

  openItem(item: Item) {
    this.navCtrl.push('PlantDetailsPage', {
      item: item
    });
  }

}
