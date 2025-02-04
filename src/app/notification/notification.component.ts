import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationService} from '../service/notification.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() iconName: string = '';
  @Input() message: string = '';
  @Input() notificationId: number | undefined;

  readonly notificationService: NotificationService = inject(NotificationService);
}
