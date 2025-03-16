import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../domain/category.type';

@Injectable({
  providedIn: 'root',
})
export class CategoriesRepository {
  private fakeData: Category[] = [
    {
      id: 1,
      name: 'Crypto',
      risk: 'High',
      liquidity: 'High',
    },
    {
      id: 2,
      name: 'RealState',
      risk: 'Low',
      liquidity: 'Low',
    },
    {
      id: 3,
      name: 'Commodities',
      risk: 'Low',
      liquidity: 'High',
    },
    {
      id: 4,
      name: 'Stocks',
      risk: 'High',
      liquidity: 'High',
    },
    {
      id: 5,
      name: 'Bonds',
      risk: 'Low',
      liquidity: 'Low',
    },
    {
      id: 6,
      name: 'Cash',
      risk: 'Low',
      liquidity: 'High',
    },
  ];

  public getAll$(): Observable<Category[]> {
    return of(this.fakeData);
  }
}
