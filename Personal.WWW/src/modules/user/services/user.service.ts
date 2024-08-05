import { Injectable } from "@angular/core";
import { BaseService } from "../../../core/services/base.service";

export interface LoginDto {
    login: string;
    password: string;
}

export interface RegisterDto {
    login: string;
    password: string;
    passwordRepeat: string;
}

export interface AuthenticatedUserDto {
    authenticated: boolean;
    login: string;
}

@Injectable({providedIn: 'root'})
export class UserService extends BaseService {
    user?: AuthenticatedUserDto;

    register(dto: RegisterDto) {
        return this.post("user/register", dto);
    }

    login(dto: LoginDto) {
        return this.post("user/login", dto);
    }

    logout() {
        return this.post("user/logout", {});
    }

    async loadAuthenticatedUser() {
        this.user = await this.get("user/authenticated");
    }

    isAuthenticated() {
        return this.user?.authenticated;
    }

    getAuthenticatedUser() {
        return this.user;
    }
}