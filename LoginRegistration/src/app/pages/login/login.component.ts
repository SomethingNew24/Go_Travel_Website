import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  message:String='';
  className='d-none';
  isProcess:boolean=false;

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { 
    this.loginForm = this.fb.group({
      'email':['',Validators.required],
      'password':['',Validators.required],
    })

  }

  ngOnInit(): void {
      
  }
  login(){
    this.isProcess=true;
    const data=this.loginForm.value;
    delete data['confirm']
    this.auth.login(data).subscribe(res=>{
      if(res.success){
        localStorage.setItem('loggedInuser',data.email);
        this.isProcess=false;
        this.message="Logged In Successfully";
        this.className='alert alert-success';
        this.router.navigate(['/home']).then(()=>{
          window.location.reload();
        });
      }
      else{
        this.isProcess=false;
        this.message=res.message;
        this.className='alert alert-danger'

      }
      
    },err=>{
      this.isProcess=false;
      this.message="server error!!";
      this.className='alert alert-danger'

    })
  }

}
