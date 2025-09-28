import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Often needed for directives
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. IMPORT FORMSMODULE
import { Home } from './components/home/home'
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Navbar } from './components/navbar/navbar';
import { IscoreService, InquiryResponse, ScoreDataResponse, } from './services/iscore';

@Component({
  selector: 'app-root', // This marks it as a standalone component
  imports: [CommonModule, FormsModule, RouterOutlet, Navbar ],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

}
