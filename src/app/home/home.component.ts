import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedin = false;

  constructor(private router: Router,
              private authService: AuthService) {  }

  ngOnInit() {
  }

  onLoadServers(id) {
    // while clicking on load server button
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  onLogin() {
    this.loggedin = true;
    this.authService.login();
    // alert('Login successful');
  }

  onLogout() {
    this.loggedin = false;
    this.authService.logout();
    alert('You have been Logged out successfully');
  }

}
