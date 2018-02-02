import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-device-details',
  templateUrl: 'user-device-details.html',
})
export class UserDeviceDetailsPage {
  item : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

}
