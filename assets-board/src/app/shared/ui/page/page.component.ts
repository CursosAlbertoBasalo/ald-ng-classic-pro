import { Component, input } from '@angular/core';

@Component({
  selector: 'lab-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  standalone: true,
  imports: [],
})
export class PageComponent {
  public title = input.required<string>();
  public subtitle = input<string>();
}
