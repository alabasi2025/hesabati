import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';

interface WSClient {
  ws: WebSocket;
  userId: number;
  bizId: number;
}

class WebSocketService {
  private wss: WebSocketServer | null = null;
  private clients: Map<string, WSClient> = new Map();

  init(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (ws, req) => {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const userId = parseInt(url.searchParams.get('userId') || '0');
      const bizId = parseInt(url.searchParams.get('bizId') || '0');
      const clientId = `${userId}_${bizId}_${Date.now()}`;

      if (!userId || !bizId) {
        ws.close(4001, 'userId and bizId required');
        return;
      }

      this.clients.set(clientId, { ws, userId, bizId });
      console.log(`🔌 WebSocket connected: user=${userId}, biz=${bizId}`);

      ws.on('close', () => {
        this.clients.delete(clientId);
        console.log(`🔌 WebSocket disconnected: ${clientId}`);
      });

      ws.on('error', () => {
        this.clients.delete(clientId);
      });

      // إرسال رسالة ترحيب
      ws.send(JSON.stringify({ type: 'connected', message: 'متصل بنجاح' }));
    });

    console.log('🔌 WebSocket server initialized on /ws');
  }

  // إرسال إشعار لكل المستخدمين في عمل معين
  notifyBusiness(bizId: number, event: string, data: any) {
    for (const [, client] of this.clients) {
      if (client.bizId === bizId && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify({ type: event, data, timestamp: new Date().toISOString() }));
      }
    }
  }

  // إرسال إشعار لمستخدم محدد
  notifyUser(userId: number, event: string, data: any) {
    for (const [, client] of this.clients) {
      if (client.userId === userId && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify({ type: event, data, timestamp: new Date().toISOString() }));
      }
    }
  }

  // إرسال تحديث شاشة مخصصة
  notifyScreenUpdate(bizId: number, screenId: number, updateType: string, data?: any) {
    this.notifyBusiness(bizId, 'screen_update', {
      screenId,
      updateType, // 'new_voucher', 'balance_change', 'inventory_change'
      ...data,
    });
  }

  // إرسال إشعار عملية جديدة
  notifyNewVoucher(bizId: number, voucher: any) {
    this.notifyBusiness(bizId, 'new_voucher', {
      voucherId: voucher.id,
      voucherType: voucher.voucherType,
      amount: voucher.totalDebit || voucher.totalCredit,
      description: voucher.description,
    });
  }

  getConnectedCount(bizId?: number): number {
    if (!bizId) return this.clients.size;
    let count = 0;
    for (const [, client] of this.clients) {
      if (client.bizId === bizId) count++;
    }
    return count;
  }
}

export const wsService = new WebSocketService();
