import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private showDetailsSubject = new BehaviorSubject<boolean>(false);
  showDetails$ = this.showDetailsSubject.asObservable();

  setShowDetails(value: boolean) {
    this.showDetailsSubject.next(value);
  }
}