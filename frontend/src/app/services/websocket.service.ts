import { Injectable, signal } from '@angular/core';

export interface WSMessage {
  type: string;
  data?: any;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimer: any = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 3000;

  connected = signal(false);
  lastMessage = signal<WSMessage | null>(null);
  notifications = signal<WSMessage[]>([]);
  unreadCount = signal(0);

  connect(userId: number, bizId: number) {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname;
    const port = '3000';
    const url = `${protocol}//${host}:${port}/ws?userId=${userId}&bizId=${bizId}`;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this.connected.set(true);
        this.reconnectAttempts = 0;
        console.log('🔌 WebSocket connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const msg: WSMessage = JSON.parse(event.data);
          this.lastMessage.set(msg);

          if (msg.type !== 'connected') {
            const current = this.notifications();
            this.notifications.set([msg, ...current].slice(0, 50));
            this.unreadCount.set(this.unreadCount() + 1);
          }
        } catch (e) {
          console.warn('Invalid WS message', event.data);
        }
      };

      this.ws.onclose = () => {
        this.connected.set(false);
        this.tryReconnect(userId, bizId);
      };

      this.ws.onerror = () => {
        this.connected.set(false);
      };
    } catch (e) {
      console.warn('WebSocket connection failed', e);
    }
  }

  private tryReconnect(userId: number, bizId: number) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;
    this.reconnectAttempts++;
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect(userId, bizId);
    }, this.reconnectDelay * Math.min(this.reconnectAttempts, 5));
  }

  disconnect() {
    clearTimeout(this.reconnectTimer);
    this.reconnectAttempts = this.maxReconnectAttempts;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected.set(false);
  }

  clearNotifications() {
    this.unreadCount.set(0);
  }

  clearAll() {
    this.notifications.set([]);
    this.unreadCount.set(0);
  }
}
