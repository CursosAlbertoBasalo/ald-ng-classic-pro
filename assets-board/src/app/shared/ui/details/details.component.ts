import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'lab-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    standalone: true,
    imports: [JsonPipe],
})
export class DetailsComponent {
  details = input<Record<string, string>>({});
}
