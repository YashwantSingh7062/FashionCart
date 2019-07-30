import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CommunicationService } from '../../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = {
    email : null,
    password : null
  }
  constructor(private communication : CommunicationService ,
              private httpService : HttpService,
               private router : Router ) { }

  ngOnInit() {
    if(!!localStorage.getItem("loggedSuccessful")){
      alert("You are successfully logged in with the email :" + localStorage.getItem('loggedSuccessful'));
      localStorage.removeItem("loggedSuccessful");
    }
  }

  loginUser(){
    this.httpService.loginUser(this.data)
        .subscribe(data =>{
          this.communication.getLoginData(data.name);
          localStorage.setItem('token',data.token); 
          this.router.navigate(['products']);
        },
        err => console.log("thisis the error" + err));
  }
}
