import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Asset, NULL_ASSET } from '../../domain/asset.type';
import { AssetsRepositoryService } from './assets-repository.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsStoreService {
  private assets = new BehaviorSubject<Asset[]>([]);

  private actions = new Subject<Action>();

  constructor() {}

  public selectActions$(): Observable<Action> {
    return this.actions.asObservable();
  }

  public selectAssetBySymbol$(symbol: string): Observable<Asset> {
    return this.assets.pipe(
      map(
        (assets) =>
          assets.find((asset) => asset.symbol === symbol) || NULL_ASSET
      )
    );
  }

  public selectAssetById$(id: number): Observable<Asset> {
    return this.assets.pipe(
      map((assets) => assets.find((asset) => asset.id === id) || NULL_ASSET)
    );
  }

  public selectAssets$(): Observable<Asset[]> {
    return this.assets.asObservable();
  }
  public selectTotalAmount$(): Observable<number> {
    return this.assets.pipe(
      map((assets) =>
        assets.reduce((acc, asset) => acc + asset.quantity * asset.value, 0)
      )
    );
  }
  public dispatchSetAssets(assets: Asset[]): void {
    this.assets.next(assets);
  }
  public dispatchAddAsset(newAsset: Asset): void {
    this.assets.next([...this.assets.value, newAsset]);
  }
  public dispatchUpdateAsset(updatedAsset: Asset): void {
    this.assets.next(
      this.assets.value.map((asset) =>
        asset.symbol === updatedAsset.symbol ? updatedAsset : asset
      )
    );
  }

  public dispatchDeleteAsset(symbol: string): void {
    this.assets.next(
      this.assets.value.filter((asset) => asset.symbol !== symbol)
    );
  }

  public dispatch(action: Action) {
    this.actions.next(action);
  }
}

export type Action = {
  type: ActionTypes;
  payload: any;
};

export type ActionTypes =
  | 'LOAD_ASSETS'
  | 'ADD_ASSET'
  | 'UPDATE_ASSET'
  | 'DELETE_ASSET';

@Injectable({
  providedIn: 'root',
})
export class AssetsEffects {
  constructor(
    private assetsStore: AssetsStoreService,
    private assetsRepository: AssetsRepositoryService
  ) {
    this.assetsStore.selectActions$().subscribe((action) => {
      switch (action.type) {
        case 'LOAD_ASSETS':
          this.assetsRepository.getAll$().subscribe((assets) => {
            this.assetsStore.dispatchSetAssets(assets);
          });
          break;
        case 'ADD_ASSET':
          this.assetsRepository.post$(action.payload).subscribe((newAsset) => {
            this.assetsStore.dispatchAddAsset(newAsset);
          });
          break;
        case 'UPDATE_ASSET':
          this.assetsRepository
            .put$(action.payload)
            .subscribe((updatedAsset) => {
              this.assetsStore.dispatchUpdateAsset(updatedAsset);
            });
          break;
        case 'DELETE_ASSET':
          this.assetsRepository.delete$(action.payload).subscribe(() => {
            this.assetsStore.dispatchDeleteAsset(action.payload); // symbol
          });
      }
    });
  }
}
