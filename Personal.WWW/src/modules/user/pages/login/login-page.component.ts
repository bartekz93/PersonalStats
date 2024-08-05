import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AppFormComponent } from '../../../../core/components/app-form/app-form.component';
import { AppText } from '../../../../core/controls/app-text.component';
import { AppPassword } from '../../../../core/controls/app-password.component';
import { AppForm, AppFormSubmit } from '../../../../core/models/app-form';
import { sameValueValidator } from '../../../../core/validators/same-value.validator';
import { AppAction } from '../../../../core/models/app-page-action.model';
import { passwordStrengthValidator } from '../../../../core/validators/passwordStrengthValidator';
import { DropdownModule } from 'primeng/dropdown';
import { LangSelect } from '../../components/lang-select/lang-select.component';
import { ThemeSelect } from '../../components/theme-select/theme-select.component';
import { UserService } from '../../services/user.service';
import { catchError, of } from 'rxjs';
import { AppMessageService } from '../../../../core/services/app-message.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    imports: [InputTextModule, PasswordModule, CommonModule, FormsModule, TranslateModule, ButtonModule, AppFormComponent, ReactiveFormsModule, AppText, AppPassword, LangSelect, ThemeSelect],
    selector: 'login-page',
    templateUrl: 'login-page.component.html',
    styleUrl: 'login-page.component.scss'
})
export class LoginPage implements OnInit {
    constructor(private userService: UserService, private router: Router, private messageService: AppMessageService) { 
    }

    loginForm!: AppForm;
    registerForm!: AppForm;

    @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;

    redirectAfterLogin() {
        this.router.navigateByUrl('/budget/transactions')
    }

    ngOnInit() { 
        if (this.userService.isAuthenticated()) {
            this.redirectAfterLogin();
        }

        this.loginForm = {
            controls: [{
                component: AppText,
                field: 'login',
                label: 'user.login',
                value: '',
                rules: [Validators.required],
                messages: {
                    required: 'user.errors.loginIsRequired'
                }
            }, {
                component: AppPassword,
                field: 'password',
                label: 'user.password',
                value: '',
                rules: [Validators.required],
                messages: {
                    required: 'user.errors.passwordIsRequired'
                }
            }],
            actions: [{
                    label: 'user.register',
                    onClick: () => this.slide(1)
                }, {
                    label: 'user.login',
                    primary: true,
                    submit: true
                },
            ]
        };

        this.registerForm = {
            controls: [{
                component: AppText,
                field: 'login',
                label: 'user.login',
                value: '',
                rules: [Validators.required],
                messages: {
                    required: 'user.errors.loginIsRequired'
                }
            }, {
                component: AppPassword,
                field: 'password',
                label: 'user.password',
                value: '',
                rules: [Validators.required, passwordStrengthValidator()],
                messages: {
                    required: 'user.errors.passwordIsRequired',
                    passwordStrength: 'user.errors.passwordStrengthTooLow'
                }
            }, {
                component: AppPassword,
                field: 'passwordRepeat',
                label: 'user.passwordRepeat',
                value: '',
                rules: [Validators.required, sameValueValidator('password')],
                messages: {
                    required: 'user.errors.passwordRepeatIsRequired',
                    sameValue: 'user.errors.passwordRepeatMismatch'
                }
            }],
            actions: [{
                    label: 'user.login',
                    icon: 'pi pi-angle-left',
                    onClick: () => this.slide(0)
                }, {
                    label: 'user.register',
                    primary: true,
                    submit: true
                },
            ]
        };

    }

    slide(index: number) {
        this.slider.nativeElement.scroll({
            top: 0,
            left: index*300,
            behavior: "smooth",
          });
    }

    async submitLogin(p: AppFormSubmit<LoginModel>) {
        p.ctx.inProgress(true);
        try {
            await this.userService.login({
                login: p.value.login,
                password: p.value.password
            });

            await this.userService.loadAuthenticatedUser();

            this.redirectAfterLogin();
            
            p.ctx.inProgress(false);
        }
        catch (err) {
            this.messageService.handleError(err)
        }
        finally {
            p.ctx.inProgress(false);
        }
    }

    async submitRegister(p: AppFormSubmit<RegisterModel>) {
        p.ctx.inProgress(true);
        try {
            await this.userService.register({
                login: p.value.login,
                password: p.value.password,
                passwordRepeat: p.value.passwordRepeat
            });

            p.ctx.inProgress(false);

            this.messageService.success('user.msg.registerSuccess')
        }
        catch (err) {
            this.messageService.handleError(err)
        }
        finally {
            p.ctx.inProgress(false);
        }
    }
}

interface LoginModel {
    login: string;
    password: string;
}

interface RegisterModel {
    login: string;
    password: string;
    passwordRepeat: string;
}