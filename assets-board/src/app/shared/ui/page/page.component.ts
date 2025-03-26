import { Component, Input } from '@angular/core';


@Component({
    selector: 'lab-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    standalone: true,
    imports: [],
})
export class PageComponent {
  @Input() title: string = '';
  @Input() subtitle: string | undefined;
}
