import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements  OnInit {
signupForm!:FormGroup;
message:String='';
className='d-none';
isProcess:boolean=false;


  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router) {
    this.signupForm = this.fb.group({
      'firstname':['',Validators.required],
      'lastname':['',Validators.required],
      'email':['',Validators.required],
      'password':['',Validators.required],
    })
   }

  ngOnInit(): void {
    
      
  }
  signup(){
    this.isProcess=true;
    const data=this.signupForm.value;
    delete data['confirm']
    this.auth.signup(data).subscribe(res=>{
      if(res.success){
        this.isProcess=false;
        this.message="Account has been created";
        this.className='alert alert-success'
        this.router.navigate(['/home']);
      }
      else{
        this.isProcess=false;
        this.message=res.message;
        this.className='alert alert-danger'

      }
      //this.signupForm.reset();
    },err=>{
      this.isProcess=false;
      this.message="Server Error!!";
      this.className='alert alert-danger'

    })
  }

}
