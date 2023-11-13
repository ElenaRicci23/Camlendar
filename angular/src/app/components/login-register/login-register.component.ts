import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from "../../model/student";
import { AuthService } from "../../service/auth.service";
import { SanitizationService } from "../../sanitization/sanitization.service";
import { ToastrService } from 'ngx-toastr';

/**
 * Componente per la gestione della registrazione e dell'accesso degli studenti.
 */
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  active: boolean = false;
  newStudent: Student = new Student();
  loginStudent = { email: '', password: '' };
  isLoading: boolean = false;
  messages: string[] = [];


  /**
   * Costruttore del componente.
   * @param authService Servizio per l'autenticazione degli studenti.
   * @param router Servizio di navigazione per reindirizzare gli utenti.
   * @param sanitizationService Servizio per la sanitizzazione dei dati.
   * @param toastr Servizio per mostrare messaggi di notifica.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizationService: SanitizationService,
    private toastr: ToastrService
  ) {}

  /**
   * Esegue il login dell'utente.
   */
login() {
  this.active = true;
  this.isLoading = true;

    const email = this.loginStudent.email;

  const password = this.loginStudent.password;

  // Utilizza la validazione specifica per l'email
  if (!this.sanitizationService.isValidEmail(email)) {
    this.toastr.error('Email non valida.', 'Errore');
    this.isLoading = false;
    return;
  }

  // Controlla che la password non sia vuota o null
  if (!this.sanitizationService.isValidString(password)) {
    this.toastr.error('Password non valida.', 'Errore');
    this.isLoading = false;
    return;
  }

  // Crea un oggetto con le credenziali per il login
  const credentials = {
    email: email, // L'email già validata
    password: password // La password così com'è, perché le password non dovrebbero contenere script HTML
  };

  // Procedi con il login usando le credenziali
  this.authService.loginUser(credentials).subscribe(
    (res: { access: string; refresh: string }) => {
      localStorage.setItem('token', res.access);
      localStorage.setItem('refresh', res.refresh);
      this.router.navigate(['/dashboard']);
      this.messages.push('Accesso riuscito con successo');
      this.toastr.success('Accesso riuscito con successo', 'Successo');
    },
    (err: string | undefined) => {
      console.log(err);
      this.messages.push('Errore durante l\'accesso');
      this.toastr.error('Errore durante l\'accesso', 'Errore');
    }
  );
}



  /**
   * Registra un nuovo studente.
   */
  register() {
  this.active = false;

  if (
    this.sanitizationService.isValidString(this.newStudent.nome) &&
    this.sanitizationService.isValidString(this.newStudent.cognome) &&
    this.sanitizationService.isValidString(this.newStudent.email) &&
    this.newStudent.anno_accademico !== undefined &&
    this.sanitizationService.isValidString(this.newStudent.anno_accademico.toString()) &&
    this.sanitizationService.isValidString(this.newStudent.gender) &&
    this.newStudent.password !== undefined &&
    this.sanitizationService.isValidString(this.newStudent.password.toString())
  ) {
    const studentData: Student = {
      nome: this.newStudent.nome,
      cognome: this.newStudent.cognome,
      email: this.newStudent.email.toLowerCase(),
      anno_accademico: this.newStudent.anno_accademico,
      gender: this.newStudent.gender,
      password: this.newStudent.password,
    };

    this.authService.registerUser(studentData).subscribe(
      (res) => {
        console.log('Risposta:', res);
        this.messages.push('Registrazione riuscita!');
        this.toastr.success('Registrazione riuscita!', 'Successo');
      },
      (err) => {
        console.error('Errore:', err);
        this.messages.push('Errore durante la registrazione');
        this.toastr.error('Errore durante la registrazione', 'Errore');
      }
    );
  } else {
    console.error('Dati di registrazione non validi.');
    this.messages.push('Dati di registrazione non validi');
    this.toastr.error('Dati di registrazione non validi', 'Errore');
  }
}

  /**
   * Abilita la vista di registrazione.
   */
  registerMovimento() {
    this.active = true;
  }

  /**
   * Abilita la vista di accesso.
   */
  loginMovimento() {
    this.active = false;
  }
}
