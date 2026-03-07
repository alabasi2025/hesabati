import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import { verifyToken } from '../middleware/auth.ts';
import { userCanAccessBusiness } from '../middleware/bizAuth.ts';

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

    this.wss.on('connection', async (ws, req) => {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const token = url.searchParams.get('token');
      const bizIdParam = url.searchParams.get('bizId');
      const bizId = parseInt(bizIdParam || '0', 10);

      if (!token || !bizIdParam || !bizId) {
        ws.close(4001, 'token and bizId required');
        return;
      }

      const payload = verifyToken(token);
      if (!payload) {
        ws.close(4001, 'invalid or expired token');
        return;
      }

      const allowed = await userCanAccessBusiness(payload.userId, payload.role, bizId);
      if (!allowed) {
        ws.close(4003, 'not allowed for this business');
        return;
      }

      const userId = payload.userId;
      const clientId = `${userId}_${bizId}_${Date.now()}`;

      this.clients.set(clientId, { ws, userId, bizId });
      console.log(`🔌 WebSocket connected: user=${userId}, biz=${bizId}`);

      ws.on('close', () => {
        this.clients.delete(clientId);
        console.log(`🔌 WebSocket disconnected: ${clientId}`);
      });

      ws.on('error', () => {
        this.clients.delete(clientId);
      });

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

  // إغلاق جميع الاتصالات بشكل آمن
  shutdown() {
    if (this.wss) {
      for (const [, client] of this.clients) {
        try {
          client.ws.close(1001, 'Server shutting down');
        } catch (e) { /* ignore */ }
      }
      this.clients.clear();
      this.wss.close();
      this.wss = null;
    }
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
