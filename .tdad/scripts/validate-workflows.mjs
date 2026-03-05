/**
 * التحقق من صحة ملفات workflow وكشف الأخطاء والانحرافات عن الكود
 * تشغيل: node .tdad/scripts/validate-workflows.mjs
 * الخروج: 0 = نجاح، 1 = أخطاء أو انحرافات
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tdadRoot = path.join(__dirname, '..');
const workflowsRoot = path.join(tdadRoot, 'workflows');
const projectRoot = path.join(tdadRoot, '..');

let hasError = false;
let hasDeviation = false;

// —— مسارات الكود للمقارنة ——
const frontendRoutesPath = path.join(projectRoot, 'frontend', 'src', 'app', 'app.routes.ts');
const backendApiPath = path.join(projectRoot, 'backend', 'src', 'routes', 'api.ts');

// خريطة مسار الواجهة → مجلد workflow (إن اختلف الاسم)
const frontendRouteToWorkflow = {
  exchangers: 'exchanges',
  pending: 'pending-accounts',
  login: 'auth',
  register: 'auth',
  businesses: 'business-select',
  '': 'dashboard',  // المسار الفارغ تحت biz/:bizId = لوحة التحكم
};

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.name.endsWith('.workflow.json')) yield full;
  }
}

function validateNode(node, filePath) {
  const err = (msg) => {
    console.error(`  [عقدة ${node.id}]: ${msg}`);
    hasError = true;
  };
  if (!node.id || typeof node.id !== 'string') err('id مطلوب ونص');
  if (!node.workflowId || typeof node.workflowId !== 'string') err('workflowId مطلوب');
  if (!node.title || typeof node.title !== 'string') err('title مطلوب');
  if (!node.description || typeof node.description !== 'string') err('description مطلوب');
  if (!node.nodeType || !['folder', 'feature'].includes(node.nodeType)) err('nodeType يجب أن يكون folder أو feature');
  if (!node.position || typeof node.position.x !== 'number' || typeof node.position.y !== 'number') err('position {x, y} مطلوب');
  if (!Array.isArray(node.dependencies)) err('dependencies يجب أن تكون مصفوفة');
  if (node.nodeType === 'feature') {
    if (!node.fileName || typeof node.fileName !== 'string') err('fileName مطلوب للعقدة من نوع feature');
  }
  if (node.nodeType === 'folder') {
    if (!node.folderPath || typeof node.folderPath !== 'string') err('folderPath مطلوب للعقدة من نوع folder');
  }
}

function validateEdges(data, ids) {
  if (!data.edges || !Array.isArray(data.edges)) return false;
  let hadError = false;
  for (const edge of data.edges) {
    if (!edge.source || !edge.target) {
      console.error(`  [حافة]: source و target مطلوبان`);
      hadError = true;
      hasError = true;
    } else if (!ids.has(edge.source) || !ids.has(edge.target)) {
      console.error(`  [حافة]: ${edge.source} -> ${edge.target} تشير إلى id غير موجود في نفس الملف`);
      hadError = true;
      hasError = true;
    }
  }
  return hadError;
}

function readAndParseWorkflowFile(filePath) {
  const rel = path.relative(workflowsRoot, filePath);
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (readErr) {
    console.error(`❌ ${rel}: لا يمكن قراءة الملف - ${readErr.message}`);
    hasError = true;
    return null;
  }
  try {
    return { data: JSON.parse(raw), rel };
  } catch (parseErr) {
    console.error(`❌ ${rel}: JSON غير صالح - ${parseErr.message}`);
    hasError = true;
    return null;
  }
}

function validateFile(filePath) {
  const parsed = readAndParseWorkflowFile(filePath);
  if (!parsed) return;
  const { data, rel } = parsed;
  let fileHasError = false;
  if (!data.version || !data.nodes) {
    console.error(`❌ ${rel}: version و nodes مطلوبان`);
    hasError = true;
    return;
  }
  const ids = new Set();
  for (const node of data.nodes) {
    if (ids.has(node.id)) {
      console.error(`  [تكرار id]: ${node.id}`);
      fileHasError = true;
      hasError = true;
    }
    ids.add(node.id);
    const prev = hasError;
    validateNode(node, filePath);
    if (hasError !== prev) fileHasError = true;
  }
  if (validateEdges(data, ids)) fileHasError = true;
  if (!fileHasError) console.log(`✅ ${rel}`);
}

// —— استخراج مسارات الواجهة من app.routes.ts ——
function getFrontendRoutesFromCode() {
  if (!fs.existsSync(frontendRoutesPath)) return { found: false, paths: [] };
  const content = fs.readFileSync(frontendRoutesPath, 'utf8');
  const exclude = new Set(['biz/:bizId', '**', 'vouchers/receipt', 'vouchers/payment']);
  const paths = [];
  const re = /path:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const p = m[1].trim();
    if (!exclude.has(p)) paths.push(p);
  }
  return { found: true, paths: [...new Set(paths)] };
}

// —— قائمة مجلدات workflow في frontend ——
function getFrontendWorkflowDirs() {
  const dir = path.join(workflowsRoot, 'frontend');
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const wf = path.join(dir, e.name, `${e.name}.workflow.json`);
    if (fs.existsSync(wf)) dirs.push(e.name);
  }
  return dirs;
}

// —— انحرافات الواجهة: صفحة في الكود بدون مجلد workflow، أو مجلد بدون صفحة ——
function checkFrontendDeviations() {
  const { found, paths } = getFrontendRoutesFromCode();
  if (!found) {
    console.warn('⚠ لم يُعثر على app.routes.ts — تخطي فحص انحرافات الواجهة.');
    return;
  }
  const workflowDirs = new Set(getFrontendWorkflowDirs());
  const routeToWorkflow = new Set(paths.map(p => frontendRouteToWorkflow[p] || p));

  const missing = [...routeToWorkflow].filter(w => !workflowDirs.has(w));
  if (missing.length) {
    hasDeviation = true;
    console.error('\n❌ انحراف (واجهة): صفحات في الكود بدون مجلد workflow في البروتوكول:');
    missing.forEach(m => console.error(`   - ${m}`));
  }
  // مجلدات workflow إضافية (توثيق لصفحات أو مكونات فرعية) مقبولة — لا نعرض تنبيهاً.
}

// —— عقد مجلدات backend من backend.workflow.json ——
function getBackendFolderIds() {
  const f = path.join(workflowsRoot, 'backend', 'backend.workflow.json');
  if (!fs.existsSync(f)) return { found: false, ids: [] };
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ids = (data.nodes || []).filter(n => n.nodeType === 'folder').map(n => n.id);
  return { found: true, ids };
}

// —— قائمة مجلدات workflow في backend ——
function getBackendWorkflowDirs() {
  const dir = path.join(workflowsRoot, 'backend');
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = [];
  for (const e of entries) {
    if (!e.isDirectory() || e.name === 'backend') continue;
    if (e.name === 'backend') continue;
    const wf = path.join(dir, e.name, `${e.name}.workflow.json`);
    if (fs.existsSync(wf)) dirs.push(e.name);
  }
  return dirs;
}

// —— انحرافات الخادم: عقدة مجلد بدون مجلد فعلي (مجلدات إضافية مسموحة) ——
function checkBackendDeviations() {
  const { found, ids } = getBackendFolderIds();
  if (!found) return;
  const folderIds = new Set(ids);
  const workflowDirs = new Set(getBackendWorkflowDirs());

  const missing = [...folderIds].filter(id => !workflowDirs.has(id));
  if (missing.length) {
    hasDeviation = true;
    console.error('\n❌ انحراف (خادم): عقدة مجلد في backend.workflow.json بدون مجلد workflow فعلي:');
    missing.forEach(m => console.error(`   - ${m}`));
  }
  // مجلدات workflow إضافية (بدون عقدة في الملف الرئيسي) مسموحة — قد تكون مجالات فرعية.
}

function getBackendDomainsFromCode() {
  if (!fs.existsSync(backendApiPath)) return { found: false, domains: [] };
  const content = fs.readFileSync(backendApiPath, 'utf8');
  const domains = new Set();
  const bizRe = /api\.(get|post|put|delete|patch)\(['"`]\/businesses\/:bizId\/([^/'"`]+)/g;
  const topRe = /api\.(get|post|put|delete|patch)\(['"`]\/([^/'"`]+)/g;
  let m;
  while ((m = bizRe.exec(content)) !== null) domains.add(m[2]);
  while ((m = topRe.exec(content)) !== null) {
    const seg = m[2];
    if (seg !== 'businesses') domains.add(seg);
  }
  return { found: true, domains: [...domains] };
}

// —— التحقق أن المجالات الرئيسية للـ API لها تمثيل (قائمة يدوية لتجنب ضجيج المسارات الفرعية) ——
const EXPECTED_BACKEND_DOMAINS = [
  'auth', 'dashboard', 'businesses', 'stations', 'employees', 'accounts', 'funds',
  'vouchers', 'journal', 'warehouse', 'suppliers', 'pending-accounts', 'settlements',
  'expense-categories', 'expense-budget', 'salaries', 'sidebar', 'currencies',
  'collections', 'partners', 'operation-types', 'roles', 'reports', 'billing',
  'users', 'exchange-rates', 'fund-types', 'screens-widgets', 'attachments', 'categories',
];
const API_DOMAIN_TO_WORKFLOW = {
  'voucher-categories': 'categories',
  'journal-entries': 'journal',
  'employee-billing-accounts': 'billing',
  'warehouses': 'warehouse',
  'expense-categories': 'expense-budget',
  'salaries': 'employees',
};

function checkBackendDomainsCoverage() {
  const { found, domains } = getBackendDomainsFromCode();
  if (!found) return;
  const workflowDirs = new Set(getBackendWorkflowDirs());
  const expected = new Set(EXPECTED_BACKEND_DOMAINS);
  const missing = [];
  for (const d of domains) {
    const name = API_DOMAIN_TO_WORKFLOW[d] || d;
    if (expected.has(d) || expected.has(name)) {
      if (!workflowDirs.has(name) && !workflowDirs.has(d)) missing.push(d);
    }
  }
  if (missing.length) {
    hasDeviation = true;
    console.error('\n❌ انحراف (خادم): مجالات API رئيسية في الكود بدون مجلد workflow:');
    missing.forEach(m => console.error(`   - ${m}`));
  }
}

// —— التشغيل ——
console.log('فحص ملفات workflow (بنية + حواف + هويات)...\n');
for (const file of walk(workflowsRoot)) {
  validateFile(file);
}

console.log('\n--- كشف الانحرافات عن الكود ---');
checkFrontendDeviations();
checkBackendDeviations();
checkBackendDomainsCoverage();

console.log('');
if (hasError) {
  console.error('انتهى الفحص بوجود أخطاء في البنية.');
  process.exit(1);
}
if (hasDeviation) {
  console.error('انتهى الفحص بوجود انحرافات عن الكود (واجهة أو خادم).');
  process.exit(1);
}
console.log('جميع الملفات صالحة ولا انحرافات مكتشفة.');
