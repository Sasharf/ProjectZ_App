import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, Nav, ViewController } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketOne } from '../../app/app.module';

//declare var WifiWizard: any;

@IonicPage()
@Component({
  selector: 'page-user-device-config',
  templateUrl: 'user-device-config.html',
})
export class UserDeviceConfigPage {
  networks: any = [];
  form: FormGroup;
  showPassword: any = false;
  submitAttempt: any = false;
  searchingWifi:any = false;
  deviceIpAddress: any;
  socket: SocketOne;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    formBuilder: FormBuilder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    public viewCtrl: ViewController,) {
   
    this.deviceIpAddress = navParams.get('deviceIpAddress');
    this.socket = new SocketOne(this.deviceIpAddress);

    this.socket.on('error-emit', (data) => {
      this.submitAttempt = false;
      alert("Error! " + data['err']);
    });
    this.socket.on('success-emit', (data) => {
      setTimeout(() => {
        alert("You successfuly configured your device.")
        this.viewCtrl.dismiss();
      }, 2000);
    });
    this.socket.on('networks-sent', (networks) => {
      console.log(networks.networks)
      this.networks = networks.networks;
      this.networksHandler(this.networks);
      setTimeout(() => {
        this.searchingWifi = false;
      }, 2000);
    });
    this.socket.on('connect', () => {
      this.ioScan();
    });
    this.socket.connect();

    this.form = formBuilder.group({
      ssid: ['', Validators.required],
      password: [''],
    });
  }

  ioScan() {
    this.searchingWifi = true;
    this.showPassword = false;
    this.form.controls["ssid"].setValue("");
    this.socket.emit('get-wifi-networks');
  }

  wifiChanged() {
    var str = this.form.controls["ssid"].value;
    var pos = str.lastIndexOf(':');
    var length = str.length;
    var encryptions = str.slice(pos + 1, length);

    if (encryptions == "Secured")
      this.showPassword = true;
    else
      this.showPassword = false;
  }

  networksHandler(networks) {
    for (var i = 0; i < networks.length; i++) {
      if (networks[i].security != "Open")
        networks[i].security = "Secured";
    }
  }

  confirmConfig() {
    var str = this.form.controls["ssid"].value;
    var pos = str.lastIndexOf(':');
    var length = str.length;
    var ssid = str.slice(0, pos);
    this.submitAttempt = true;

    let network = {
      ssid: ssid,
      password: this.form.controls["password"].value
    }
    this.socket.emit("confirm-network", network);
  }
}