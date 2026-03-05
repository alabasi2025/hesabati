import { Component, Injector, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BusinessService } from '../services/business.service';

/** استخراج bizId من مسار التطبيق (مثل /biz/1 أو /biz/1/stations) */
function getBizIdFromUrl(url: string): number {
  const match = /\/biz\/(\d+)(?:\/|$)/.exec(url || '');
  return match ? Number.parseInt(match[1], 10) : 0;
}

/**
 * قاعدة للمكونات التي تعتمد على bizId.
 *
 * مهم: لا تستدعِ onBizIdChange من constructor لأن حقول الصفحات المشتقة (signals)
 * لا تكون مهيأة بعد، وهذا يسبب أخطاء runtime مثل "Cannot read properties of undefined (reading 'set')".
 */
@Component({ template: '' })
export abstract class BasePageComponent implements OnInit, OnDestroy {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly injector = inject(Injector);
  protected readonly destroy$ = new Subject<void>();

  bizId = 0;
  biz = inject(BusinessService);

  ngOnInit(): void {
    // قراءة أولية بعد تهيئة الحقول في الصفحات المشتقة
    this.applyBizId(this.readBizId());

    // مزامنة مع BusinessService (يضبطه الـ layout فوراً من المسار)
    effect(() => {
      const id = this.biz.currentBusinessId();
      const num = id == null ? 0 : Number(id);
      if (num > 0) this.applyBizId(num);
    }, { injector: this.injector });

    const params$ = this.route.parent?.params ?? this.route.params;
    params$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.applyBizId(this.readBizId()));

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        filter(e => e.urlAfterRedirects.includes('/biz/'))
      )
      .subscribe(() => this.applyBizId(this.readBizId()));

    // احتياط: في بعض الحالات تتأخر params/snapshot عن أول دورة
    queueMicrotask(() => this.applyBizId(this.readBizId()));
  }

  private readBizId(): number {
    if (globalThis.window !== undefined) {
      const fromPath = getBizIdFromUrl(globalThis.window.location.pathname);
      if (fromPath > 0) return fromPath;
    }
    let id = this.biz.currentBusinessId();
    if (id != null && id > 0) return Number(id);
    const snapshotParams = this.route.parent?.snapshot?.params ?? this.route.snapshot?.params;
    if (snapshotParams?.['bizId']) return Number.parseInt(snapshotParams['bizId'], 10);
    id = getBizIdFromUrl(this.router.url);
    if (id > 0) return id;
    let state: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    while (state) {
      const p = state.params['bizId'];
      if (p) return Number.parseInt(p, 10);
      state = state.firstChild ?? null;
    }
    return 0;
  }

  private applyBizId(id: number): void {
    if (id > 0 && id !== this.bizId) {
      this.bizId = id;
      this.onBizIdChange(this.bizId);
    }
  }

  /** تُستدعى عند تغيّر bizId (من الخدمة أو المسار) */
  protected abstract onBizIdChange(bizId: number): void;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
