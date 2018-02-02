import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider, ProfileProvider } from '../../providers/providers';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-profile-list',
  templateUrl: 'profile-list.html',
})
export class ProfileListPage {

  email: any;
  profiles: Item[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private authProvider: AuthProvider,
    private profileProvider: ProfileProvider) {

      this.authProvider.getEmail((email) => {
        this.email = email;
        console.log(email);
        this.profileProvider.getProfilesByEmail(this.email).subscribe(data => {
          if(data["success"])
            this.profiles = data["answer"];
        })
      });
  }

  addItem() {
    let addModal = this.modalCtrl.create('ProfileAddPage');
    addModal.onDidDismiss(() => {
      this.profileProvider.getProfilesByEmail(this.email).subscribe(data => {
        if(data["success"])
          this.profiles = data["answer"];
      })
    })
    addModal.present();
  }

  openItem(item: Item) {
    this.navCtrl.push('ProfileDetailsPage', {
      item: item
    });
  }

}
