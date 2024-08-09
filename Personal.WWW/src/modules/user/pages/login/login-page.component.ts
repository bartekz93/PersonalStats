import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AppText } from '../../../../core/controls/app-text.component';
import { AppPassword } from '../../../../core/controls/app-password.component';
import { sameValueValidator } from '../../../../core/validators/same-value.validator';
import { passwordStrengthValidator } from '../../../../core/validators/passwordStrengthValidator';
import { LangSelect } from '../../components/lang-select/lang-select.component';
import { ThemeSelect } from '../../components/theme-select/theme-select.component';
import { UserService } from '../../services/user.service';
import { AppMessageService } from '../../../../core/services/app-message.service';
import { AppError } from '@core/components/app-error/app-error.component';
import { AppButtonComponent } from '@core/components/app-button/app-button.component';
import { AppFormComponent } from '@core/components/app-form/app-form.component';

@Component({
    standalone: true,
    imports: [
        InputTextModule, 
        PasswordModule,
        CommonModule, 
        FormsModule, 
        TranslateModule, 
        ButtonModule, 
        ReactiveFormsModule, 
        AppText, 
        AppPassword, 
        LangSelect, 
        ThemeSelect, 
        AppError, 
        AppFormComponent,
        AppButtonComponent],
    selector: 'login-page',
    templateUrl: 'login-page.component.html',
    styleUrl: 'login-page.component.scss'
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;

    isLogging = false;
    isRegistering = false;

    slideVisible = 0;

    @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;

    constructor(private ngZone: NgZone, private userService: UserService, private router: Router, private messageService: AppMessageService) { 
        this.loginForm = new FormGroup({
            login: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ])
        })

        this.registerForm = new FormGroup({
            login: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required, passwordStrengthValidator() ]),
            passwordRepeat: new FormControl('', [ Validators.required, sameValueValidator('password') ])
        })
    }

    redirectAfterLogin() {
        this.router.navigateByUrl('/budget/transactions')
    }

    ngOnInit() { 
        if (this.userService.isAuthenticated()) {
            this.redirectAfterLogin();
        }
    }

    slide(index: number) {
        this.slider.nativeElement.scroll({
            top: 0,
            left: index*300,
            behavior: "smooth",
          });
        this.slideVisible = index
    }

    async submitLogin(form: LoginFormModel) {
        this.isLogging = true; 
        try {
            await this.userService.login({
                login: form.login,
                password: form.password
            });

            await this.userService.loadAuthenticatedUser();

            this.redirectAfterLogin();
        }
        catch (err) {
            this.messageService.handleError(err)
        }
        finally {
            this.isLogging = false;
        }
    }

    async submitRegister(form: RegisterFormModel) {
        this.isRegistering = true;
        try {
            await this.userService.register({
                login: form.login,
                password: form.password,
                passwordRepeat: form.passwordRepeat
            });

            this.messageService.success('user.msg.registerSuccess')
        }
        catch (err) {
            this.messageService.handleError(err)
        }
        finally {
            this.isRegistering = false;
        }
    }
}

interface LoginFormModel {
    login: string;
    password: string;
}

interface RegisterFormModel {
    login: string;
    password: string;
    passwordRepeat: string;
}