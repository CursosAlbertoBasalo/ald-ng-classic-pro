import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';
import { ThemeToggleComponent } from './theme-toggle.component';

@Component({
  selector: 'lab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, AsyncPipe, CurrencyPipe],
})
export class HeaderComponent {
  private assetsStore = inject(AssetsStoreService);
  protected title = 'Assets Board';

  protected totalAmount$ = this.assetsStore.selectTotalAmount$();
}
