import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
@Component({

  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {
  onVideosClick() {
    console.log('Videos link clicked!');
  }
  title = 'your-angular-project';
}
