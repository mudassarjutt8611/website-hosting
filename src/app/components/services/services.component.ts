import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
services:any=[];
  constructor(public userService:UserServiceService,private toastr:ToastrService,private SpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
     this.getAllServices();
  }

  getAllServices() {
    this.SpinnerService.show()
    // console.log(this.createProject.value)
    this.userService.getServices().subscribe((result: any) => {
      console.log(result)

      if (result.status) {
        this.toastr.success(result.message);
        this.services=result.res;
        this.SpinnerService.hide()
      }
      else {
        this.toastr.error(result.message);
        this.SpinnerService.hide()
      }
    }, (err:any) => {
      this.SpinnerService.hide()
      this.toastr.error('Something went wrong');
    })
  }

}
