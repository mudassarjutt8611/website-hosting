import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
projects:any=[
  // {pName:"mudassar",description:'description',workPercentage:29},
  // {pName:"mudassar",description:'description',workPercentage:89},
  // {pName:"mudassar",description:'description',workPercentage:100},
  // {pName:"mudassar",description:'description',workPercentage:6},
];
color="red"
  constructor(private userService:UserServiceService,private toastr:ToastrService,private SpinnerService:NgxSpinnerService,private formbuilder:FormBuilder) {

  }

  project:any;

  ngOnInit() {
    this.getAllProjects()
  }


  getAllProjects() {
    this.SpinnerService.show()
    let data = { "Rolename": "Client", "id": "7" }
    this.userService.getAllProjects(data).subscribe((result: any) => {
      console.log(result)

      if (result.status) {
        this.toastr.success(result.message)
        this.projects=result.res;
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

modules:any=[];
  viewDetail(data:any){
    // let text = "How are you doing today?";
    console.log(data)
    if(data!= null){
    this.modules = data.split(",");
    console.log('da',this.modules)
  }
  else{
    this.toastr.info("No data to show")
  }
// console.log(myArray)

  }




}

