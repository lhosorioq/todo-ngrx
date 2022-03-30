import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
              private auth: AuthService,
              private route: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUsuario() {
    if ( this.loginForm.invalid ) { return; }

    Swal.fire({
      title: 'Please, Wait',
      didOpen: () => {
        Swal.showLoading()
      }});

    const { email, password } = this.loginForm.value;
    this.auth.loginUsuario( email, password )
      .then( () => {
        Swal.close();
        this.route.navigate(['./'])
      })
      .catch( err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      }));
  }

}
