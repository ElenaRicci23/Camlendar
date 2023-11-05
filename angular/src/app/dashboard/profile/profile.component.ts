import { Component, OnInit } from '@angular/core';
import {Profile} from "../../model/profile";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile: Profile = { nome: '', cognome: '',  email: '',  anno_accademico: 0, corsi: [] };
  constructor(private authService: AuthService) { }

ngOnInit(): void {
  this.authService.getProfile().subscribe((data: Profile) => {
    this.profile = data;
  });
}
  protected readonly JSON = JSON;
}

