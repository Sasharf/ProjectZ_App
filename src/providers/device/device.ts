import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

@Injectable()
export class DeviceProvider {

  constructor(public http: HttpClient,
    public api: ApiProvider) {
  }

  addDevice(device){
    let response = this.api.post('devices/add', device).share();
    return response;
  }
  getDevices(){
    let response = this.api.get('devices/get').share();
    return response;
  }
  getUserDevices(email){
    let data = {
      email:email
    }
    let response = this.api.post('devices/getUserDevices', data).share();
    return response;
  }

  linkDeviceToUser(deviceProfile){
    let response = this.api.post('devices/link', deviceProfile).share();
    return response;
  }
}
