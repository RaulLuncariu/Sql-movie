import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/services/auth.service";
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;
  isDarkTheme:boolean = false;

  constructor(private authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true:false;
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }

  storeThemeSelection(){
    localStorage.setItem('theme',this.isDarkTheme?"Dark":"Light");
  }
}
