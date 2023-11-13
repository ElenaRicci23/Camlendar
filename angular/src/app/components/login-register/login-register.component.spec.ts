import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule
import { SanitizationService } from '../../sanitization/sanitization.service';

import { LoginRegisterComponent } from './login-register.component';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let sanitizationService: SanitizationService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRegisterComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule], // Aggiungi RouterTestingModule qui
      providers: [
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['error', 'success']) },
        SanitizationService, // Aggiungi il SanitizationService ai providers
      ],
    });
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    sanitizationService = TestBed.inject(SanitizationService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sanitize and validate login credentials', () => {
    // Simula un tentativo di login con credenziali non valide o malevole
    const maliciousEmail = "test@example.com<script>alert('XSS')</script>";
    const maliciousPassword = "password<script>alert('XSS')</script>";

    // Sanitizza le credenziali malevole
    const sanitizedEmail = sanitizationService.sanitizeInput(maliciousEmail);
    const sanitizedPassword = sanitizationService.sanitizeInput(maliciousPassword);

    // Controlla che le stringhe sanificate siano valide
    expect(sanitizationService.isValidString(sanitizedEmail)).toBeFalse();
    expect(sanitizationService.isValidString(sanitizedPassword)).toBeFalse();

    // La funzione loginUser non deve essere chiamata se le credenziali non sono valide
    // Questo test si aspetta che l'autenticazione non proceda con credenziali non valide
  });
});
