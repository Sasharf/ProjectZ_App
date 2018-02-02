import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { DeviceProvider, AuthProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-user-device-list',
  templateUrl: 'user-device-list.html',
})
export class UserDeviceListPage {
  devices: Item[] = [];
  email: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private deviceProvider: DeviceProvider,
    private auth: AuthProvider) {

  }

  ionViewDidLoad() {
    this.auth.getEmail((email) => {
      this.email = email;
      this.deviceProvider.getUserDevices(this.email).subscribe(data => {
        console.log(data["answer"])
        if (data["success"]) {
          this.devices = data["answer"];
        }
        else {
          alert(data["msg"]);
        }
      });
    })
  }

  addItem() {
    let addModal = this.modalCtrl.create('UserDeviceAddPage');
    addModal.onDidDismiss(() => {
      this.deviceProvider.getUserDevices(this.email).subscribe(data => {
        if(data["success"])
          this.devices = data["answer"];
      })
    })
    addModal.present();
  }

  deleteItem(item) {
    //this.items.delete(item);
  }

  openItem(item: Item) {
    this.navCtrl.push('UserDeviceDetailsPage', {
      item: item
    });
  }
}
