import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.loginForm = this._buildLoginForm();
  }

  public login(): void {
    if (this.loginForm.valid) {
      console.log('Login Form is valid!');
    } else {
      console.error('Login Form is invalid!');
    }
  }

  private _buildLoginForm(): FormGroup {
    return this._formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
