import { APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { AssetsEffects } from './app/shared/assets/asset-effects.service';

function configAssetsEffects(assetsEffects: AssetsEffects) {
  return () => assetsEffects.configForRoot();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    {
      provide: APP_INITIALIZER,
      useFactory: configAssetsEffects,
      multi: true,
      deps: [AssetsEffects],
    },
  ],
}).catch((err) => console.error(err));
