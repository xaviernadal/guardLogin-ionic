import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private alertcontroller: AlertController,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]]
    })
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.auth.login(this.credentials.value).subscribe(async () => {
      await loading.dismiss();
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    },
      async error => {
        await loading.dismiss();
        const alert = await this.alertcontroller.create({
          header: 'Login failed',
          message: error.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }
}
// Language: typescript
