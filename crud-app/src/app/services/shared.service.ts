import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userListUpdateSource = new Subject<void>();

  userListUpdate$ = this.userListUpdateSource.asObservable();

  triggerUserListUpdate() {
    this.userListUpdateSource.next();
  }
  constructor() { }
}
