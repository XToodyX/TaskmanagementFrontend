import {Injectable, signal, WritableSignal} from '@angular/core';
import {Notification} from '../shared/Notification';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: WritableSignal<Notification[]> = signal([]);

  counter: number = 0;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if(event instanceof NavigationStart) this.notifications.set([]);
    });
  }

  private createNotification(iconName: string, message: string) {
    this.notifications.update((value) => [...value, {id: ++this.counter, iconName: iconName, message: message}]);
  }

  createErrorNotification(message: string) {
    this.createNotification('error', message);
  }

  createWarnNotification(message: string) {
    this.createNotification('warn', message);
  }

  createSuccessNotification(message: string) {
    this.createNotification('check_circle', message);
  }

  createCustomNotification(iconName: string, message: string) {
    this.createNotification(iconName, message);
  }

  dismissNotification(id: number | undefined) {
    if(id !== undefined)
      this.notifications.update(value => value.filter((element) => element.id !== id));
  }
}
