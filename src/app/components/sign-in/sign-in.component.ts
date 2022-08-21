import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private userService: UserServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get signinFormControl(){
    return this.signinForm.controls;
  }
  onSubmit() {
    this.SpinnerService.show();
    this.userService.signIn(this.signinForm.value).subscribe(
      (result: any) => {
        console.log(result)
        if (result.status) {

          if(result.res.Rolename == "Client"){
            this.toastr.success(result.message);
            sessionStorage.setItem("userdata", JSON.stringify(result.res));

            this.userService.logedInUser();
            this.SpinnerService.hide();
            this.router.navigate(['/home']);
          }
          else {
            this.SpinnerService.hide();
            this.toastr.error('only Client is allowed');
          }
        }
        else {
          this.toastr.error(result.message);
          this.SpinnerService.hide();
        }
      },
      (err: any) => {
        this.SpinnerService.hide();
        this.toastr.error('Something went wrong');
      }
    );
  }
}
