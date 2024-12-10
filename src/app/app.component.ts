import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
  MatListItem,
  MatNavList
} from "@angular/material/list";
import {
  MatSidenav,
  MatSidenavContainer
} from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import {
  RouterLink,
  RouterOutlet
} from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatIcon,
    RouterLink,
    MatToolbar,
    MatIconButton
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {


}
