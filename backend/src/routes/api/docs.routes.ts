/**
 * docs.routes.ts — Phase 9
 * Swagger UI لعرض وثائق الـ API بشكل تفاعلي
 * المسار: GET /api/docs
 */
import { Hono } from 'hono';

export const docsRoutes = new Hono();

// ── Serve OpenAPI JSON spec ──────────────────────────────────────────────────
docsRoutes.get('/api/docs/openapi.json', (c) => {
  return c.json({
  "openapi": "3.0.3",
  "info": {
    "title": "Hesabati API",
    "description": "نظام محاسبة متكامل - Comprehensive Accounting System API",
    "version": "1.0.0",
    "contact": {
      "name": "Hesabati Support",
      "email": "support@hesabati.com"
    },
    "license": {
      "name": "Private"
    }
  },
  "servers": [
    {
      "url": "http://localhost:3000/api",
      "description": "Development server"
    },
    {
      "url": "https://api.hesabati.com/api",
      "description": "Production server"
    }
  ],
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "JWT token using HS256 algorithm. Expires in 7 days."
      }
    },
    "schemas": {
      "Error": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string",
            "example": "غير مصرح"
          },
          "code": {
            "type": "string",
            "example": "UNAUTHORIZED"
          }
        }
      },
      "Pagination": {
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "example": 1
          },
          "limit": {
            "type": "integer",
            "example": 20
          },
          "total": {
            "type": "integer",
            "example": 100
          }
        }
      },
      "Voucher": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "businessId": {
            "type": "integer",
            "example": 1
          },
          "voucherType": {
            "type": "string",
            "enum": [
              "receipt",
              "payment",
              "transfer",
              "journal"
            ]
          },
          "amount": {
            "type": "number",
            "example": 1500
          },
          "date": {
            "type": "string",
            "format": "date",
            "example": "2026-01-15"
          },
          "status": {
            "type": "string",
            "enum": [
              "draft",
              "pending",
              "posted",
              "cancelled",
              "reviewed"
            ]
          },
          "sequenceNumber": {
            "type": "string",
            "example": "RCV-2026-000001"
          },
          "description": {
            "type": "string",
            "example": "دفعة عميل"
          },
          "currencyId": {
            "type": "integer",
            "example": 1
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "Partner": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "businessId": {
            "type": "integer"
          },
          "name": {
            "type": "string",
            "example": "شركة الأمل"
          },
          "partnerType": {
            "type": "string",
            "enum": [
              "customer",
              "supplier",
              "both"
            ]
          },
          "phone": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "balance": {
            "type": "number",
            "example": 5000
          }
        }
      },
      "Employee": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "businessId": {
            "type": "integer"
          },
          "name": {
            "type": "string",
            "example": "أحمد محمد"
          },
          "salary": {
            "type": "number",
            "example": 3000
          },
          "jobTitleId": {
            "type": "integer"
          },
          "departmentId": {
            "type": "integer"
          },
          "status": {
            "type": "string",
            "enum": [
              "active",
              "inactive"
            ]
          }
        }
      },
      "AuditLog": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "userId": {
            "type": "integer"
          },
          "businessId": {
            "type": "integer"
          },
          "action": {
            "type": "string",
            "example": "create_voucher"
          },
          "tableName": {
            "type": "string",
            "example": "vouchers"
          },
          "recordId": {
            "type": "integer"
          },
          "oldData": {
            "type": "object"
          },
          "newData": {
            "type": "object"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      }
    }
  },
  "security": [
    {
      "BearerAuth": []
    }
  ],
  "paths": {
    "/auth/login": {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "تسجيل الدخول",
        "security": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "username",
                  "password"
                ],
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "admin"
                  },
                  "password": {
                    "type": "string",
                    "format": "password"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "تم تسجيل الدخول بنجاح",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string",
                      "description": "JWT token (HS256, 7 days)"
                    },
                    "user": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer"
                        },
                        "username": {
                          "type": "string"
                        },
                        "role": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "بيانات غير صحيحة",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/businesses/{bizId}/vouchers-enhanced": {
      "get": {
        "tags": [
          "Vouchers — السندات"
        ],
        "summary": "جلب قائمة السندات",
        "parameters": [
          {
            "name": "bizId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "page",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 1
            }
          },
          {
            "name": "limit",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 20
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string",
              "enum": [
                "draft",
                "posted",
                "cancelled"
              ]
            }
          },
          {
            "name": "dateFrom",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date"
            }
          },
          {
            "name": "dateTo",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "قائمة السندات",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Voucher"
                  }
                }
              }
            }
          },
          "401": {
            "$ref": "#/components/responses/Unauthorized"
          },
          "403": {
            "$ref": "#/components/responses/Forbidden"
          }
        }
      }
    },
    "/businesses/{bizId}/vouchers/{id}/status": {
      "post": {
        "tags": [
          "Vouchers — السندات"
        ],
        "summary": "تغيير حالة السند",
        "parameters": [
          {
            "name": "bizId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "status"
                ],
                "properties": {
                  "status": {
                    "type": "string",
                    "enum": [
                      "draft",
                      "pending",
                      "posted",
                      "cancelled",
                      "reviewed",
                      "unreviewed"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "تم تغيير الحالة"
          },
          "400": {
            "description": "انتقال حالة غير مسموح"
          }
        }
      }
    },
    "/businesses/{bizId}/partners": {
      "get": {
        "tags": [
          "Partners — الشركاء"
        ],
        "summary": "جلب قائمة الشركاء",
        "parameters": [
          {
            "name": "bizId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "قائمة الشركاء",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Partner"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Partners — الشركاء"
        ],
        "summary": "إضافة شريك جديد",
        "parameters": [
          {
            "name": "bizId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Partner"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "تم الإنشاء"
          },
          "400": {
            "description": "بيانات غير صحيحة"
          }
        }
      }
    },
    "/businesses/{bizId}/employees": {
      "get": {
        "tags": [
          "Employees — الموظفون"
        ],
        "summary": "جلب قائمة الموظفين",
        "parameters": [
          {
            "name": "bizId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "قائمة الموظفين",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Employee"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/businesses/{bizId}/audit-log": {
      "get": {
        "tags": [
          "Audit — سجل المراجعة"
        ],
        "summary": "جلب سجل التدقيق",
        "parameters": [
          {
            "name": "bizId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "action",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "tableName",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "schema": {
              "type": "integer",
              "default": 50,
              "maximum": 200
            }
          }
        ],
        "responses": {
          "200": {
            "description": "سجل المراجعة",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AuditLog"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/businesses/{bizId}/employees": {
      "get": {
        "tags": ["Employees — الموظفين"],
        "summary": "جلب قائمة الموظفين",
        "security": [{"BearerAuth": []}],
        "parameters": [{"name": "bizId", "in": "path", "required": true, "schema": {"type": "integer"}}],
        "responses": {"200": {"description": "قائمة الموظفين"}}
      },
      "post": {
        "tags": ["Employees — الموظفين"],
        "summary": "إضافة موظف جديد",
        "security": [{"BearerAuth": []}],
        "parameters": [{"name": "bizId", "in": "path", "required": true, "schema": {"type": "integer"}}],
        "requestBody": {"required": true, "content": {"application/json": {"schema": {"$ref": "#/components/schemas/Employee"}}}},
        "responses": {"201": {"description": "تم إضافة الموظف"}}
      }
    },
    "/businesses/{bizId}/warehouses": {
      "get": {
        "tags": ["Warehouses — المخازن"],
        "summary": "جلب قائمة المخازن",
        "security": [{"BearerAuth": []}],
        "parameters": [{"name": "bizId", "in": "path", "required": true, "schema": {"type": "integer"}}],
        "responses": {"200": {"description": "قائمة المخازن"}}
      },
      "post": {
        "tags": ["Warehouses — المخازن"],
        "summary": "إضافة مخزن جديد",
        "security": [{"BearerAuth": []}],
        "parameters": [{"name": "bizId", "in": "path", "required": true, "schema": {"type": "integer"}}],
        "requestBody": {"required": true, "content": {"application/json": {"schema": {"type": "object"}}}},
        "responses": {"201": {"description": "تم إضافة المخزن"}}
      }
    },
    "/businesses/{bizId}/salaries": {
      "get": {
        "tags": ["Salaries — الرواتب"],
        "summary": "جلب سجلات الرواتب",
        "security": [{"BearerAuth": []}],
        "parameters": [
          {"name": "bizId", "in": "path", "required": true, "schema": {"type": "integer"}},
          {"name": "month", "in": "query", "schema": {"type": "integer", "minimum": 1, "maximum": 12}},
          {"name": "year", "in": "query", "schema": {"type": "integer"}}
        ],
        "responses": {"200": {"description": "سجلات الرواتب"}}
      }
    },
    "/businesses/{bizId}/reports/monthly-revenue": {
      "get": {
        "tags": ["Reports — التقارير"],
        "summary": "تقرير الإيرادات الشهرية",
        "security": [{"BearerAuth": []}],
        "parameters": [
          {"name": "bizId", "in": "path", "required": true, "schema": {"type": "integer"}},
          {"name": "year", "in": "query", "schema": {"type": "integer"}}
        ],
        "responses": {"200": {"description": "بيانات الإيرادات الشهرية"}}
      }
    },
    "/businesses/{bizId}/reconciliations": {
      "get": {
        "tags": ["Reconciliations — المطابقات"],
        "summary": "جلب قائمة المطابقات",
        "security": [{"BearerAuth": []}],
        "parameters": [{"name": "bizId", "in": "path", "required": true, "schema": {"type": "integer"}}],
        "responses": {"200": {"description": "قائمة المطابقات"}}
      }
    },
    "/health": {
      "get": {
        "tags": [
          "System"
        ],
        "summary": "فحص حالة الخادم",
        "security": [],
        "responses": {
          "200": {
            "description": "الخادم يعمل",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "example": "ok"
                    },
                    "timestamp": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
});

// ── Swagger UI HTML ──────────────────────────────────────────────────────────
docsRoutes.get('/api/docs', (c) => {
  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hesabati API Docs — وثائق واجهة برمجة التطبيقات</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
  <style>
    body { margin: 0; background: #fafafa; }
    .swagger-ui .topbar { background: #1a365d; }
    .swagger-ui .topbar-wrapper .link span { color: #fff; font-family: 'Cairo', sans-serif; }
    .swagger-ui .info .title { font-family: 'Cairo', sans-serif; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api/docs/openapi.json',
      dom_id: '#swagger-ui',
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      layout: 'BaseLayout',
      deepLinking: true,
      showExtensions: true,
      showCommonExtensions: true,
    });
  </script>
</body>
</html>`;
  return c.html(html);
});
