import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenuComponent } from "../core/components/app-menu/app-menu.component";
import { LangService } from '../modules/user/services/lang.service';
import { ThemeService } from '../modules/user/services/theme.service';
import { UserService } from '../modules/user/services/user.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserAvatarComponent } from '../modules/user/components/user-avatar/user-avatar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppMenuComponent, ToastModule, UserAvatarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PersonalStats';

  constructor(private userService: UserService, private langService: LangService, private themeService: ThemeService) {
    langService.loadLang();
    themeService.loadTheme();
    userService.loadAuthenticatedUser();
  }

  isAuth() {
    return this.userService.isAuthenticated();
  }
}
