import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userData ={
    name : null
  };
  constructor(
              private _httpService : HttpService,
              private _communication : CommunicationService
              ) { }

  ngOnInit() {
   
    if(!!localStorage.getItem('token')){
      this.userData.name = localStorage.getItem('username');
    }

      this._communication.communication$
        .subscribe(data => {
          if(!!localStorage.getItem('token')){
            this.userData.name = localStorage.getItem('username');
          }
          else{
            localStorage.setItem('username',data.toString());
            this.userData.name = localStorage.getItem('username');
          }
        },
        err => console.log(err));
  }

  get httpService(){
    return this._httpService;
  }

  get communication(){
    return this._communication;
  }
}
