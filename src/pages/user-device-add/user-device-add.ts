import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { NetworkInterface } from '@ionic-native/network-interface';
import { SocketOne } from '../../app/app.module';
import { LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider, DeviceProvider } from '../../providers/providers';
 

@IonicPage()
@Component({
  selector: 'page-user-device-add',
  templateUrl: 'user-device-add.html',
})
export class UserDeviceAddPage {
  networkIp: any = "192.168.1.137";
  deviceIpAddress: any;
  loader: any;
  form: FormGroup;
  submited:any = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner,
    public viewCtrl: ViewController,
    private networkP: NetworkInterface,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private authProvider: AuthProvider,
    private deviceProvider: DeviceProvider,
    private toastController : ToastController,
    formBuilder: FormBuilder, 
    platform: Platform) {

    this.form = formBuilder.group({
      mac: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required]
    });
    this.authProvider.getEmail((email) => {
      this.form.controls["email"].setValue(email);
      this.form.controls["mac"].setValue("C8-21-58-32-A6-54"); // JUST FOR TESTING
    });
    platform.ready().then(() => {
      if (platform.is('cordova')) {
        this.networkP.getIPAddress().then((value: string) => {
          this.networkIp = value;
        },
          error => {
            alert("You are not connected to any network!");
          });
      }
    });
  }
  addDeviceToUser(){
    this.deviceProvider.linkDeviceToUser(this.form.value).subscribe(data => {
      console.log("success:" + data["success"])// JUST FOR TESTING
      if(data["success"])
        {
          let toast = this.toastController.create({
            message: data["msg"],
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-success'
          });
          toast.present();
          this.submited = true;
        }
        else{
          let toast = this.toastController.create({
            message: "Error. Try Again Later.",
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-error'
          });
          toast.present();
        }
    });
  }

  scanCode() {
    if (Camera['installed']()) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.form.controls["mac"].setValue(barcodeData.text);
      })
    }
  }

  scanNetwork() {
    this.presentLoading();
    var str = this.networkIp;
    var pos = str.lastIndexOf('.');
    var prefix = str.slice(0, pos + 1);
    var flag = false;

    for (var i = 1; i < 2 && flag == false; i++) {
      let url = prefix + i + ":3001";
      let dummyUrl = "http://localhost:3001";// JUST FOR TESTING
      let s: SocketOne = new SocketOne(dummyUrl);

      s.on('connect_error', () => {
        s.disconnect();
      })
      s.on('connect', () => {
        this.deviceIpAddress = dummyUrl;
        flag = true;
        setTimeout(() => {
          this.loader.dismiss();
          this.openConfigPage();
        }, 3000);
      })
      s.connect();
    }

    setTimeout(() => {
      if (!flag) {
        this.loader.dismiss();
        alert("Couldnt find your device. Your plant and your phone need to be in the same network to find each other.\n Try to turn off and on you plant and try again.")
      }
    }, 5000);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait while we searching for your device",
    });
    this.loader.present();
  }

  openConfigPage() {
    let addModal = this.modalCtrl.create('UserDeviceConfigPage', {deviceIpAddress: this.deviceIpAddress});
    addModal.onDidDismiss(() => {
      this.viewCtrl.dismiss();
    })
    addModal.present();
  }
  configLater(){
    this.viewCtrl.dismiss();
  }
  configNow(){
    this.scanNetwork();
  }

  cancel(){
    this.viewCtrl.dismiss();
  }
}
