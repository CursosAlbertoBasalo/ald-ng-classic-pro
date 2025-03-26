import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'lab-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    standalone: true,
    imports: [NgIf],
})
export class PageComponent {
  @Input() title: string = '';
  @Input() subtitle: string | undefined;
}
