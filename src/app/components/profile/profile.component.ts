import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData = {
    name : null,
    email : null,
    address : null,
    userImage : null
  };
  enableDisableName = true;
  enableDisableEmail = true;
  enableDisableAddress = true;
  changedData = {
    name : null,
    email : null,
    address : null
  }
  constructor(private httpService : HttpService,
    private router : Router,
    private communication : CommunicationService
    ) { }

  ngOnInit() {
    this.httpService.getUser()
        .subscribe(data => {
          this.userData = data;
          this.changedData.name = data.name;
          this.changedData.email = data.email;
          this.changedData.address = data.address;
        },
                    err => {
                      localStorage.removeItem("token");
                      this.router.navigate(['login']);
                    });
  }

  cancelNameUpdate(){
    this.changedData.name = this.userData.name;
    this.enableDisableName = !this.enableDisableName;
  }

  cancelEmailUpdate(){
    this.changedData.email = this.userData.email;
    this.enableDisableEmail = !this.enableDisableEmail;
  }

  cancelAddressUpdate(){
    this.changedData.address = this.userData.address;
    this.enableDisableAddress = !this.enableDisableAddress;
  }

  updateUser(){
    this.httpService.updateUser(this.changedData)
        .subscribe(data => {
          this.enableDisableAddress = true;
          this.enableDisableName = true;
          this.enableDisableEmail = true;
          this.userData.name = this.changedData.name;
          this.userData.email = this.changedData.email;
          localStorage.setItem('username',this.changedData.name);
          location.reload();
        },
        err => console.log(err));
  }

  deactivateAccount(){
    if(confirm('Do you really want to delete this account')){
      this.httpService.deactivateAccount()
        .subscribe(data => {
          localStorage.removeItem('token');
          this.router.navigate(['signup']);
        },
                  err => console.log(err));
    }
    else{
      return false;
    }
  }
}
