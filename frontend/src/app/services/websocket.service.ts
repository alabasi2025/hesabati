import { Injectable, signal } from '@angular/core';

export interface WSMessage {
  type: string;
  data?: any;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | undefined = undefined;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 10;
  private readonly reconnectDelay = 3000;

  connected = signal(false);
  lastMessage = signal<WSMessage | null>(null);
  notifications = signal<WSMessage[]>([]);
  unreadCount = signal(0);

  private getWsBaseUrl(): string {
    const protocol = globalThis.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = globalThis.location.hostname;
    const port = globalThis.location.port || '80';
    return `${protocol}//${host}${port === '80' || port === '443' ? '' : ':' + port}`;
  }

  /** الاتصال باستخدام token (JWT) و bizId — مطلوب للمصادقة على الباك اند. */
  connect(token: string, bizId: number) {
    if (this.ws?.readyState === WebSocket.OPEN) return;
    if (!token || !bizId) return;

    const base = this.getWsBaseUrl();
    const url = `${base}/ws?token=${encodeURIComponent(token)}&bizId=${bizId}`;

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
        } catch (e: unknown) {
          console.warn('Invalid WS message', event.data);
        }
      };

      this.ws.onclose = () => {
        this.connected.set(false);
        this.tryReconnect(token, bizId);
      };

      this.ws.onerror = () => {
        this.connected.set(false);
      };
    } catch (e: unknown) {
      console.warn('WebSocket connection failed', e);
    }
  }

  private tryReconnect(token: string, bizId: number) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;
    this.reconnectAttempts++;
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect(token, bizId);
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
