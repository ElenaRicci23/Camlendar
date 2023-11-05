import { Component } from '@angular/core';
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  isAuthenticated: boolean;

  constructor(private authService: AuthService,private router : Router) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }


}
