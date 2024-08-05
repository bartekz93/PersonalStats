import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { AppMessageService } from '../../../../core/services/app-message.service';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    imports: [ButtonModule, OverlayPanelModule, TooltipModule, TranslateModule],
    selector: 'user-avatar',
    templateUrl: 'user-avatar.component.html',
    styleUrl: 'user-avatar.component.scss'
})

export class UserAvatarComponent implements OnInit {
    constructor(private userService: UserService, private router: Router, private messageService: AppMessageService) { }

    @ViewChild('op') userPanel?: OverlayPanel;
    signingOut = false;

    ngOnInit() { }

    userPanelClick(ev: any) {
        this.userPanel?.toggle(ev);
    }
    
    loginName() {
        return this.userService.user?.login;
    }
    
    async signout() {
        this.signingOut = true;
        await this.userService.logout();
        await this.userService.loadAuthenticatedUser();
        this.messageService.success('user.msg.logoutSuccess');
        this.router.navigate(['user/login']);
        this.signingOut = false;
    }
    
    loginInitial() {
        return this.userService.user?.login[0];
    }
}