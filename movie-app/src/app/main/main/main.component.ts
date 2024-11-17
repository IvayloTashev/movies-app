import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../shared/hero-section/hero-section.component";
import { NotFoundComponent } from '../../error/not-found/not-found.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeroSectionComponent, HeroSectionComponent, NotFoundComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
