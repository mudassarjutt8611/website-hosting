import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
createProject!:FormGroup;
  constructor(private formbuilder:FormBuilder,

    private userService:UserServiceService,private router:Router,private SpinnerService:NgxSpinnerService,
    private toastr:ToastrService) {
    this.createProject=this.formbuilder.group({
      pName:['',[Validators.required]],
      description:['',[Validators.required]],
      projectFile:['',Validators.required],
      Status:['new']
    })

   }

  ngOnInit(): void {

  }
  get createProjectControl(){
    return this.createProject.controls;
  }

   imageToUpload:any;
  handleImagetoInput(imageInput: any) {
     this.imageToUpload = imageInput.files[0];
  }
  addProject() {
    this.SpinnerService.show()
    const formData: FormData = new FormData();
    formData.append('pName', this.createProject.value.pName);
    formData.append('description', this.createProject.value.description);
    formData.append('Status', this.createProject.value.Status);
    formData.append('userId', this.userService.userData.id);
    let filename =this.imageToUpload.name.replace(" ","")
    
    formData.append('projectFile', this.imageToUpload, filename);
    debugger
    this.userService.createProject(formData).subscribe((result: any) => {
      this.router.navigate(['/services'])
      if (result.status) {
        this.toastr.success(result.message)
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
