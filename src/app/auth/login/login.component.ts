import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login.request.payload';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, throwError} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    )
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email'
            + ' and activate your account before you Login!';
        }
      });
  }



  login() {

    if (this.isLoading$.getValue()) {
      return
    }

    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.spinner.show();
    this.isLoading$.next(true);
    this.authService.login(this.loginRequestPayload)
      .pipe(finalize(() => {
        this.spinner.hide();
        this.isLoading$.next(false);
      } ))
      .subscribe(data => {
      this.router.navigateByUrl('');
      this.toastr.success('Login Successful');
    }, error => {
      this.toastr.error('Login Failed. Please check your credentials and try again.')
      throwError(error);
    });
  }
}

