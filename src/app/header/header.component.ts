import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('headingAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms ease-in', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent {

}

