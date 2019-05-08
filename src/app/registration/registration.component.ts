import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations : [
    trigger( 'AnimateTab',
      [
        state('delete',style({'background-color' : 'red'})),
        transition('* => void',animate(500,
          style({
            transform :'translateX(100px)',
            opacity :0
          }
          ))),
          transition('void => *',
          [style({
            transform :'translateX(-200px)',
            opacity :1
          })
            ,animate(500)])
      ]
    ),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(200px)'
        }),
        animate(500)
      ]),
      // transition('* => void', [
      //   animate(300, style({
      //     transform: 'translateX(100px)',
      //     opacity: 0
      //   }))
      // ])
    ]),
  ]
})

export class RegistrationComponent implements OnInit {
public responseStatus :boolean = true;
public responseStatusError :boolean = true;
message:string;
  loginEmpForm: FormGroup;
  constructor(public authservice : AuthService) { 
    
  }

  ngOnInit() {
    this.authservice.getWCFData().subscribe(
      (res:any) => {console.log(res)}
    )
    this.loginEmpForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    });
  }
  OnRegisterClick()
  {
      console.log(this.loginEmpForm.value);
      this.authservice.register(this.loginEmpForm.get('username').value,this.loginEmpForm.get('password').value)
      .subscribe(
        (response: any) => { 
          console.log(response);
          this.responseStatus = false;
          this.message = response.json();
         },
          
        (error: any) => { 
          this.responseStatusError = false;
          var a  = error._body;
          console.log(a.Message);
          this.message = a.Message;

         }
      )
  }
  CloseAlert(){
    this.responseStatus =true;
  }
  CloseAlertError(){
    this.responseStatusError =true;
  }

}
