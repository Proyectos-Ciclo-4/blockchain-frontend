import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sessionActive: boolean = false;
  currentUser: any;
  
  constructor(
    private auth$: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionActive = getAuth().currentUser ?  true : false;
    //this.auth$.sessionActive.subscribe(sessionActive => this.sessionActive = sessionActive.valueOf());
  }

  logout(){
    console.log("salir");    
    this.auth$.logout()
    .then(() => {
      this.auth$.sessionActive.emit(false)
      this.router.navigate(['user/login'])
    })
    .catch((error) => console.log(error));    
  }

}
