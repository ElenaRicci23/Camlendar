import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {AuthService} from "../../service/auth.service";
import {Corso} from "../../model/corso";


@Component({
  selector: 'app-corsi',
  templateUrl: './corsi.component.html',
  styleUrls: ['./corsi.component.css']
})
export class CorsiComponent implements OnInit{

corsi: Corso[] = [];
anno1Corsi: Corso[] = [];
anno2Corsi: Corso[] = [];
anno3Corsi: Corso[] = [];


  constructor(private apiService: ApiService , private authService : AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.apiService.getCorsi().subscribe((data: Corso[]) => {
        this.corsi = data;
      });
    }
  }
}
