import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
      <footer>
          &copy; 2019yashwantsingh | E-Commerce project
      </footer>
  `,
  styles: [`
    footer{
      margin-top:20px;
      height:20vh;
      width:100%;
      background:#2d3436;
      line-height:20vh;
      text-align:center;
      color:white;
    }
  `]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
