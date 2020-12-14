import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { appReducer } from './store/app.reducer';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    HeaderModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.registerIcon(iconRegistry, domSanitizer);
  }

  private registerIcon(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer): void {
    iconRegistry.addSvgIcon('template',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/newspaper-variant.svg')
    );
    iconRegistry.addSvgIcon('edit',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/pencil-outline.svg')
    );
    iconRegistry.addSvgIcon('trello',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/trello.svg')
    );
    iconRegistry.addSvgIcon('home',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/home-outline.svg')
    );
    iconRegistry.addSvgIcon('grid',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/dots-grid.svg')
    );
    iconRegistry.addSvgIcon('notification',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/bell-outline.svg')
    );
    iconRegistry.addSvgIcon('information',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/information-outline.svg')
    );
    iconRegistry.addSvgIcon('watch',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/eye-outline.svg')
    );
    iconRegistry.addSvgIcon('description',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/format-align-left.svg')
    );
    iconRegistry.addSvgIcon('activity',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/format-list-bulleted.svg')
    );
    iconRegistry.addSvgIcon('members',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/account-outline.svg')
    );
    iconRegistry.addSvgIcon('labels',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/label-outline.svg')
    );
    iconRegistry.addSvgIcon('checklist',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/check-box-outline.svg')
    );
    iconRegistry.addSvgIcon('clock',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/clock-time-four-outline.svg')
    );
    iconRegistry.addSvgIcon('attachment',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/attachment.svg')
    );
    iconRegistry.addSvgIcon('cover',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/dock-bottom.svg')
    );
    iconRegistry.addSvgIcon('arrow-right',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/arrow-right.svg')
    );
    iconRegistry.addSvgIcon('copy',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/content-copy.svg')
    );
    iconRegistry.addSvgIcon('archive',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/archive-outline.svg')
    );
    iconRegistry.addSvgIcon('share',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/share-variant-outline.svg')
    );
    iconRegistry.addSvgIcon('replay',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/replay.svg')
    );
  }
}
