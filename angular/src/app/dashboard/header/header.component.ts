import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
studentInitials: string = '';

  constructor(private authService: AuthService, private  router : Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((userData: any) => {
      if (userData) {

        this.studentInitials = this.getUserInitials(userData.nome, userData.cognome);
      }
    });
  }
  getUserInitials(firstName: string, lastName: string): string {
    return (firstName[0] + lastName[0]).toUpperCase();
  }
  logout() {
    this.authService.logoutUser({}).subscribe(
      () => {
        console.log('Logout effettuato con successo');
        // Rimuovi il token e reindirizza alla pagina di autenticazione
        this.authService.removeToken();
        this.router.navigate(['/autenticazione']);
      },
      (error) => {
        console.error('Errore durante il logout:', error);
        // Gestisci gli errori durante il logout, se necessario
      }
    );
  }
}

