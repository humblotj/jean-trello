import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  public closeAllDropdown = new Subject<void>();

  constructor() { }
}
