import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Currency,
  CurrencyCategory,
  CurrencyType,
} from '../domain/currency.type';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesRepositoryService {
  private currencies: Currency[] = [
    // Major Fiat Currencies
    {
      symbol: 'USD',
      name: 'United States Dollar',
      type: CurrencyType.FIAT,
      category: CurrencyCategory.MAJOR,
      price: 1.0, // USD per USD
      change: 0.0,
      changesPercentage: 0.0,
      timestamp: Date.now(),
      volume24h: 125000000000,
      yearHigh: 1.125,
      yearLow: 1.045,
    },
    {
      symbol: 'EUR',
      name: 'Euro',
      type: CurrencyType.FIAT,
      category: CurrencyCategory.MAJOR,
      price: 1.065, // USD per EUR
      change: -0.0025,
      changesPercentage: -0.23,
      timestamp: Date.now(),
      volume24h: 125000000000,
      yearHigh: 1.125,
      yearLow: 1.045,
    },
    {
      symbol: 'GBP',
      name: 'British Pound',
      type: CurrencyType.FIAT,
      category: CurrencyCategory.MAJOR,
      price: 1.245, // USD per GBP
      change: 0.0035,
      changesPercentage: 0.28,
      timestamp: Date.now(),
      volume24h: 85000000000,
      yearHigh: 1.285,
      yearLow: 1.215,
    },
    {
      symbol: 'JPY',
      name: 'Japanese Yen',
      type: CurrencyType.FIAT,
      category: CurrencyCategory.MAJOR,
      price: 0.00657, // USD per JPY
      change: -0.00002,
      changesPercentage: -0.3,
      timestamp: Date.now(),
      volume24h: 95000000000,
      yearHigh: 0.0075,
      yearLow: 0.0063,
    },
    // Layer 1 Cryptocurrencies
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      type: CurrencyType.CRYPTO,
      category: CurrencyCategory.LAYER1,
      price: 66750.25, // USD per BTC
      change: 1250.75,
      changesPercentage: 1.91,
      timestamp: Date.now(),
      marketCap: 1315000000000, // USD
      volume24h: 38500000000,
      yearHigh: 69000.0,
      yearLow: 26350.0,
      circulatingSupply: 19685000,
      maxSupply: 21000000,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      type: CurrencyType.CRYPTO,
      category: CurrencyCategory.LAYER1,
      price: 3275.5, // USD per ETH
      change: 45.25,
      changesPercentage: 1.4,
      timestamp: Date.now(),
      marketCap: 395000000000, // USD
      volume24h: 15750000000,
      yearHigh: 3850.0,
      yearLow: 1550.0,
      circulatingSupply: 120250000,
    },
    // Layer 2 Solutions
    {
      symbol: 'MATIC',
      name: 'Polygon',
      type: CurrencyType.CRYPTO,
      category: CurrencyCategory.LAYER2,
      price: 0.95,
      change: 0.025,
      changesPercentage: 2.7,
      timestamp: Date.now(),
      marketCap: 9500000000,
      volume24h: 750000000,
      yearHigh: 1.25,
      yearLow: 0.55,
      circulatingSupply: 10000000000,
    },
    // DeFi Tokens
    {
      symbol: 'UNI',
      name: 'Uniswap',
      type: CurrencyType.CRYPTO,
      category: CurrencyCategory.DEFI,
      price: 7.85,
      change: 0.15,
      changesPercentage: 1.95,
      timestamp: Date.now(),
      marketCap: 4750000000,
      volume24h: 325000000,
      yearHigh: 9.5,
      yearLow: 4.25,
      circulatingSupply: 605000000,
    },
    // Stablecoins
    {
      symbol: 'USDT',
      name: 'Tether',
      type: CurrencyType.CRYPTO,
      category: CurrencyCategory.STABLECOIN,
      price: 1.0001,
      change: 0.0001,
      changesPercentage: 0.01,
      timestamp: Date.now(),
      marketCap: 95000000000,
      volume24h: 45000000000,
      yearHigh: 1.001,
      yearLow: 0.999,
      circulatingSupply: 95000000000,
    },
    // Meme Coins
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      type: CurrencyType.CRYPTO,
      category: CurrencyCategory.MEME,
      price: 0.085,
      change: 0.002,
      changesPercentage: 2.41,
      timestamp: Date.now(),
      marketCap: 12000000000,
      volume24h: 850000000,
      yearHigh: 0.125,
      yearLow: 0.055,
      circulatingSupply: 141000000000,
    },
    // Minor Fiat Currencies
    {
      symbol: 'AUD',
      name: 'Australian Dollar',
      type: CurrencyType.FIAT,
      category: CurrencyCategory.MINOR,
      price: 0.645,
      change: -0.0015,
      changesPercentage: -0.23,
      timestamp: Date.now(),
      volume24h: 45000000000,
      yearHigh: 0.675,
      yearLow: 0.625,
    },
  ];

  /**
   * Get all available currencies
   */
  public getAll$(): Observable<Currency[]> {
    return of(this.currencies);
  }

  /**
   * Get currencies by type (Fiat or Crypto)
   */
  public getByType$(type: CurrencyType): Observable<Currency[]> {
    return of(this.currencies.filter((c) => c.type === type));
  }

  /**
   * Get currencies by category
   */
  public getByCategory$(category: CurrencyCategory): Observable<Currency[]> {
    return of(this.currencies.filter((c) => c.category === category));
  }

  /**
   * Get a specific currency by symbol
   */
  public getBySymbol$(symbol: string): Observable<Currency | undefined> {
    return of(this.currencies.find((c) => c.symbol === symbol));
  }

  /**
   * Get all crypto currencies
   */
  public getCrypto$(): Observable<Currency[]> {
    return this.getByType$(CurrencyType.CRYPTO);
  }

  /**
   * Get all fiat currencies
   */
  public getFiat$(): Observable<Currency[]> {
    return this.getByType$(CurrencyType.FIAT);
  }
}
