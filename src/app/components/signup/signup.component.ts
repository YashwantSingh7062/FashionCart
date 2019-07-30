import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 data = {
   name : null,
   email : null,
   password : null,
   userImage : null,
   address : null
 }
  constructor(private httpService : HttpService , private router : Router) { }

  ngOnInit() {
  }

  onFileSelect(event){
    this.data.userImage = event.target.files[0];
  }

  signupUser(){
    let formData = new FormData();
    formData.append("name" , this.data.name);
    formData.append("email" , this.data.email);
    formData.append("password" , this.data.password);
    formData.append("userImage" , this.data.userImage);
    formData.append("address" , this.data.address);

    this.httpService.signupUser(formData)
        .subscribe(data => {
            localStorage.setItem('loggedSuccessful',this.data.email);
            this.router.navigate(['login']);
        },
                  err => console.log(err));
  }
}
