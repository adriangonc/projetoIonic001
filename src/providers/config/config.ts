//import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide : false,
    name : "",
    userName : ""
  }

  constructor() {
    
  }
  //Recupera dados do localStorage
  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  //Persiste dados no localStorage
  setConfigData(showSlide?: boolean, name?: string, userName?: string) {
    let config = {
      showSlide : false,
      name : "",
      userName : ""
    };

    if(showSlide){
      config.showSlide = showSlide;
    }

    if(name){
      config.name = name;
    }

    if(userName){
      config.userName = userName;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

}
