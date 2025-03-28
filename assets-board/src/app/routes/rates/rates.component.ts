import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rates } from 'src/app/shared/rates.service';
import { PageComponent } from 'src/app/shared/ui/page/page.component';

@Component({
  selector: 'lab-rates',
  standalone: true,
  imports: [PageComponent, KeyValuePipe, DecimalPipe],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
})
export default class RatesComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected rates: Rates = this.route.snapshot.data['rates'];
}
