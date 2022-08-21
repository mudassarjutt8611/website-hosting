import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
navigateStatus='home';
isLogedIn:boolean=false;
  constructor(private userService:UserServiceService,private route:Router) { }
  userData = this.userService.userData
  ngOnInit() {
    this.userService.getLogInStatus.subscribe((res:any)=>{
      if(res==true){
        this.isLogedIn=true;
      }
      else {
        this.isLogedIn=false;
      }
    })
    if(sessionStorage.getItem("userdata")!==null){
      this.isLogedIn=true;
    }
    else {
      this.isLogedIn=false;
    }


  }

  logout(){
    sessionStorage.removeItem("userdata");
    this.isLogedIn=false;
    this.route.navigate(['/home'])
  }

}
