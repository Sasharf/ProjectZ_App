import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { FamilyProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-family-list',
  templateUrl: 'family-list.html',
})
export class FamilyListPage {
  items: Item[] = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private familyProvider: FamilyProvider,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.familyProvider.getFamily().subscribe(data => {
      console.log(data["answer"])
      if (data["success"]) {
        for (let item of data["answer"]) {
          this.items.push(new Item(item));
        }
      }
    }); 
  }

  addItem() {
    let addModal = this.modalCtrl.create('FamilyAddPage');
    addModal.onDidDismiss(() => {
      this.familyProvider.getFamily().subscribe(data => {
        if(data["success"])
          this.items = data["answer"];
      })
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    //this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('FamilyDetailsPage', {
      item: item
    });
  }

}
