import {
  Component,
  inject
} from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule
} from "@angular/forms";
import {
  Router,
  RouterLink
} from "@angular/router";
import { MessagesService } from "../messages/messages.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "login",
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})
export class LoginComponent {
  fb = inject(FormBuilder);
  messagesService = inject(MessagesService);
  authService = inject(AuthService);
  router = inject(Router);
  form = this.fb.group({
    email: [""],
    password: [""]
  });

  async onLogin() {
    try {
      const { email, password } = this.form.value;

      if (!email || !password) {
        this.messagesService.showMessage(
          "Enter an email and password",
          "error"
        );

        return;
      }

      await this.authService.login(email, password)
      await this.router.navigate(['/home']);
    } catch (err) {
      console.error(err);

      this.messagesService.showMessage(
        "Login failed, please try again",
        "error"
      );
    }
  }
}
