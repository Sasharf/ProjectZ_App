import { Injectable, NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { AuthProvider } from '../providers/auth/auth';
import { DeviceProvider } from '../providers/device/device';
import { FamilyProvider } from '../providers/family/family';
import { PlantsProvider } from '../providers/plants/plants';
import { ProfileProvider } from '../providers/profile/profile';
import { SharedProvider } from '../providers/shared/shared';
import { ValidateProvider } from '../providers/validate/validate';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner} from '@ionic-native/barcode-scanner';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { SocketIoModule, Socket } from 'ng-socket-io';

@Injectable()
export class SocketOne extends Socket {
    constructor(url: string) {
        super({ url: url, options: {'timeout': 5000, 'connect_timeout': 5000} });
    }
 
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule, 
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    AuthProvider,
    DeviceProvider,
    FamilyProvider,
    PlantsProvider,
    ProfileProvider,
    SharedProvider,
    ValidateProvider,
    BarcodeScanner,
    Camera,
    NetworkInterface,
    AndroidPermissions,
    LocationAccuracy,
    SocketOne,
  ]
})
export class AppModule {}
