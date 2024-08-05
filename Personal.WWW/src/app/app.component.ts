import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenuComponent } from "../core/components/app-menu/app-menu.component";
import { UserService } from '../core/services/user.service';
import { LangService } from '../modules/user/services/lang.service';
import { ThemeService } from '../modules/user/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PersonalStats';

  constructor(private userService: UserService, private langService: LangService, private themeService: ThemeService) {
    langService.loadLang();
    themeService.loadTheme();
  }

  isAuth() {
    return this.userService.isAuthenticated();
  }
}
