import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectDone: number = 0;
  statisfiedClient: number = 0;
  teamMember: number = 0;
  totalDownload: number = 0;
  totalGames: number = 0;
  totalUser: number = 0;
  yearExperience: number = 0;
  clinets: any = []
  games: any = []

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(public userService: UserServiceService, private toastr: ToastrService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getGames();
    // this.getDownloads();
    // this.getClients();
  }
  getGames() {
    this.userService.getGames().subscribe((res: any) => {
      if (res.status) {
        this.games = res.res
        this.toastr.success(res.message)
        this.SpinnerService.hide()

      }
      else {
        this.toastr.error(res.message);
        this.SpinnerService.hide()
      }

    }, (err: any) => {
      this.SpinnerService.hide()
      this.toastr.error('Something went wrong');
    })
  }

  getDownloads() {
    this.userService.getDownloads().subscribe((res: any) => {
      console.log('res', res)

      if (res.status) {
        this.projectDone = res.res[0].projectDone
        this.statisfiedClient = res.res[0].statisfiedClient
        this.teamMember = res.res[0].teamMember
        this.totalDownload = res.res[0].totalDownload
        this.totalGames = res.res[0].totalGame
        this.totalUser = res.res[0].totalUser
        this.yearExperience = res.res[0].yearExperience
        this.toastr.success(res.message)
        this.SpinnerService.hide()

      }
      else {
        this.toastr.error(res.message);
        this.SpinnerService.hide()
      }

    }, (err: any) => {
      this.SpinnerService.hide()
      this.toastr.error('Something went wrong');
    })
  }

  getClients() {
    this.userService.getClients().subscribe((res: any) => {
      if (res.status) {
        this.clinets = res.res
        this.toastr.success(res.message)
        this.SpinnerService.hide()

      }
      else {
        this.toastr.error(res.message);
        this.SpinnerService.hide()
      }

    }, (err: any) => {
      this.SpinnerService.hide()
      this.toastr.error('Something went wrong');
    })
  }

}
