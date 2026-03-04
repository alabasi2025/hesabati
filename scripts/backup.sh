#!/bin/bash
# ===================== سكربت النسخ الاحتياطي لقاعدة بيانات حساباتي =====================
# 
# الاستخدام:
#   ./scripts/backup.sh                    # نسخ احتياطي عادي
#   ./scripts/backup.sh --restore FILE     # استعادة من نسخة احتياطية
#
# إعداد Cron (نسخ يومي الساعة 2 صباحاً):
#   0 2 * * * /path/to/hesabati/scripts/backup.sh >> /var/log/hesabati/backup.log 2>&1

set -euo pipefail

# ===================== الإعدادات =====================
BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"
DB_NAME="hesabati"
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/hesabati_${TIMESTAMP}.sql.gz"

# ألوان للطباعة
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"; }
log_warn() { echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"; }
log_error() { echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"; }

# ===================== دالة النسخ الاحتياطي =====================
do_backup() {
    log_info "بدء النسخ الاحتياطي لقاعدة بيانات ${DB_NAME}..."
    
    # إنشاء مجلد النسخ الاحتياطي
    mkdir -p "${BACKUP_DIR}"
    
    # تنفيذ النسخ الاحتياطي
    if command -v docker &> /dev/null && docker ps -q -f name=hesabati-db &> /dev/null; then
        # النسخ من داخل Docker
        log_info "استخدام Docker container..."
        docker exec hesabati-db pg_dump -U "${DB_USER}" "${DB_NAME}" | gzip > "${BACKUP_FILE}"
    else
        # النسخ المباشر
        PGPASSWORD="${DB_PASSWORD:-postgres}" pg_dump -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" "${DB_NAME}" | gzip > "${BACKUP_FILE}"
    fi
    
    # التحقق من النسخة
    BACKUP_SIZE=$(du -sh "${BACKUP_FILE}" | cut -f1)
    log_info "تم إنشاء النسخة الاحتياطية: ${BACKUP_FILE} (${BACKUP_SIZE})"
    
    # حذف النسخ القديمة
    DELETED=$(find "${BACKUP_DIR}" -name "hesabati_*.sql.gz" -mtime +${RETENTION_DAYS} -delete -print | wc -l)
    if [ "${DELETED}" -gt 0 ]; then
        log_warn "تم حذف ${DELETED} نسخ احتياطية أقدم من ${RETENTION_DAYS} يوم"
    fi
    
    # إحصائيات
    TOTAL_BACKUPS=$(find "${BACKUP_DIR}" -name "hesabati_*.sql.gz" | wc -l)
    TOTAL_SIZE=$(du -sh "${BACKUP_DIR}" | cut -f1)
    log_info "إجمالي النسخ: ${TOTAL_BACKUPS} | الحجم الكلي: ${TOTAL_SIZE}"
    
    log_info "النسخ الاحتياطي اكتمل بنجاح ✅"
}

# ===================== دالة الاستعادة =====================
do_restore() {
    local RESTORE_FILE="$1"
    
    if [ ! -f "${RESTORE_FILE}" ]; then
        log_error "الملف غير موجود: ${RESTORE_FILE}"
        exit 1
    fi
    
    log_warn "⚠️  تحذير: سيتم استبدال قاعدة البيانات الحالية بالكامل!"
    read -p "هل أنت متأكد؟ (yes/no): " CONFIRM
    
    if [ "${CONFIRM}" != "yes" ]; then
        log_info "تم إلغاء الاستعادة"
        exit 0
    fi
    
    log_info "بدء الاستعادة من: ${RESTORE_FILE}..."
    
    if command -v docker &> /dev/null && docker ps -q -f name=hesabati-db &> /dev/null; then
        gunzip -c "${RESTORE_FILE}" | docker exec -i hesabati-db psql -U "${DB_USER}" "${DB_NAME}"
    else
        gunzip -c "${RESTORE_FILE}" | PGPASSWORD="${DB_PASSWORD:-postgres}" psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" "${DB_NAME}"
    fi
    
    log_info "تمت الاستعادة بنجاح ✅"
}

# ===================== دالة عرض النسخ المتاحة =====================
list_backups() {
    log_info "النسخ الاحتياطية المتاحة:"
    echo ""
    if [ -d "${BACKUP_DIR}" ]; then
        ls -lh "${BACKUP_DIR}"/hesabati_*.sql.gz 2>/dev/null || echo "  لا توجد نسخ احتياطية"
    else
        echo "  مجلد النسخ الاحتياطي غير موجود"
    fi
}

# ===================== التنفيذ =====================
case "${1:-backup}" in
    --restore)
        if [ -z "${2:-}" ]; then
            log_error "يجب تحديد ملف النسخة الاحتياطية"
            echo "الاستخدام: $0 --restore FILE"
            exit 1
        fi
        do_restore "$2"
        ;;
    --list)
        list_backups
        ;;
    *)
        do_backup
        ;;
esac
