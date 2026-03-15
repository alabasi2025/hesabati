# Voucher Engine Validation Matrix

This matrix verifies the one-way voucher lifecycle and unified financial posting across workflow, transaction, inventory, and reporting engines.

## Core Scenarios

| Scenario | Input Path | Expected Engine Behavior | Expected Reporting Result |
|---|---|---|---|
| Payment voucher draft -> confirmed | `POST /businesses/:bizId/vouchers/:id/status` with `confirmed` | `enhancements` delegates to `confirmDraftTransaction` once; journal entry created once; account/fund balances updated once | Account/fund statement shows `source_type=payment_voucher` |
| Receipt voucher draft -> confirmed | same as above | Same single posting point via `transaction.service` | Statement shows `source_type=receipt_voucher` |
| Confirmed voucher -> cancelled | `POST /businesses/:bizId/vouchers/:id/status` with `cancelled` | Delegates to `cancelTransaction`; balances are rolled back without creating a separate compensating voucher | Statement/history reflects cancellation policy, no dedicated cancellation endpoint/UI |
| Confirmed voucher -> draft | status change attempt | Rejected by route (`400`) due one-way policy | No extra movement posted |
| Workflow transition draft -> confirmed | `/workflow` transition endpoint | `workflow.routes` calls `applyAccountingForConfirmedVoucher` => same `confirmDraftTransaction` path | Same movement type behavior as status endpoint |
| Inventory auto-journal operation | inventory route/orchestration | Posting remains centralized; no duplicate route-side balance logic | Account statement can be filtered by `inventory_txn` (prefix-based classification) |
| Manual journal entry | journal routes | Journal entry stays independent from voucher cancellation model | Account statement filter `journal_manual` works |

## Regression Guardrails

- No dedicated voucher-cancel endpoint outside status route (only `POST /vouchers/:id/status`).
- No cancellation-specific method in frontend API service.
- No cancellation dialog/buttons for a separate compensating voucher flow in vouchers UI.
- Statement endpoint accepts `sourceType` filter: `all | payment_voucher | receipt_voucher | journal_manual | inventory_txn`.
- Fund statement fallback supported on the same account-statement endpoint (by `fundId`) for treasury visibility.

## Build Verification

- Backend build: `pnpm -C backend run build`
- Frontend build: `pnpm -C frontend run build`

