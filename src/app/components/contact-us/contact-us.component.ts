import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
contactusForm!:FormGroup;
  constructor(private formBuildr:FormBuilder,private userService:UserServiceService,private toastr:ToastrService,private SpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
this.contactusForm=this.formBuildr.group({
  name:['',[Validators.required]],
  email:['',[Validators.required]],
  subject:['',[Validators.required]],
  message:['',[Validators.required]],
})

  }
  get contactUsControl(){
    return this.contactusForm.controls;
  }

  sendMessage(){
    this.userService.sendMessage(this.contactusForm.value).subscribe((res:any)=>{

      if (res.status) {
        this.toastr.success(res.message)
        this.SpinnerService.hide()

      }
      else {
        this.toastr.error(res.message);
        this.SpinnerService.hide()
      }

    }, (err:any) => {
      this.SpinnerService.hide()
      this.toastr.error('Something went wrong');
    })
  }

  }

