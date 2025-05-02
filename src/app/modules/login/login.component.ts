import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public hidePassword: boolean = true;

  private _patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this._buildLoginForm();
  }

  public login(): void {
    if (this.loginForm.valid) {
      console.log('login');
    }
  }

  private _buildLoginForm(): FormGroup {
    return this._formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this._patternEmail)]],
        password: ['', Validators.required]
      }
    )
  }

}
