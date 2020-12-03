import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';

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
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
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
  }
}
