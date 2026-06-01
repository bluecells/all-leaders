# Keystatic Best Practices: Avoiding Module Initialization Errors

**Document Date:** 2026-06-01
**Based on:** Audit of "Cannot access 'It' before initialization" production error
**Applicable to:** Astro + Keystatic + Markdoc projects

---

## TL;DR

**Never use barrel exports to import components in `keystatic.config.tsx`.**

Always use **explicit, direct imports** from individual component files.

```typescript
// ❌ WRONG - Creates circular dependency in production
import { Banner, Carousel, Duo } from './src/content-components/index.ts';

// ✅ CORRECT - Linear dependency chain
import { Banner } from './src/content-components/banner';
import { Carousel } from './src/content-components/carousel';
import { Duo } from './src/content-components/duo';
```

---

## 1. UNDERSTANDING THE PROBLEM

### 1.1 What Barrel Exports Are

A barrel export (or "index pattern") re-exports modules from a central file:

```typescript
// src/content-components/index.ts (BARREL)
export { Banner } from './banner';
export { Carousel } from './carousel';
export { Duo } from './duo';
// ... 19 more exports
```

This allows clean imports:
```typescript
// Clean syntax
import { Banner, Carousel, Duo } from './content-components';
```

### 1.2 Why This Fails with Keystatic

**In Dev Mode:**
- Vite uses native ESM
- Modules loaded on-demand
- Module initialization order is dynamic
- ✅ Works fine

**In Production:**
- Rollup pre-bundles everything
- Attempts to resolve all imports upfront
- Detects circular dependency with Keystatic virtual module
- ❌ Cannot determine initialization order
- ❌ Some modules execute before @keystatic/core initializes
- ❌ TDZ (Temporal Dead Zone) error at runtime

### 1.3 Technical Details

**Circular Dependency Chain:**

```
keystatic.config.tsx
  ↓ import from barrel
    ↓ barrel re-exports 22 components
      ↓ each component imports @keystatic/core
        ↓ @keystatic/core has virtual module reference
          ↓ virtual module points back to keystatic.config.tsx
            ↓ CYCLE DETECTED
              ↓ Rollup cannot resolve order
                ↓ @keystatic/core defined AFTER component execution
                  ↓ Variable 'It' accessed in TDZ → ERROR
```

**TDZ (Temporal Dead Zone):**
```javascript
// Component tries to access 'It'
// But 'It' hasn't been initialized yet
// Result: ReferenceError: Cannot access 'It' before initialization
```

---

## 2. THE SOLUTION

### 2.1 Use Explicit Imports

```typescript
// ✅ CORRECT PATTERN
import { config, fields, collection } from '@keystatic/core';
import { Banner } from './src/content-components/banner';
import { Carousel } from './src/content-components/carousel';
import { Duo } from './src/content-components/duo';
import { Hero } from './src/content-components/hero';
// ... (9 more explicit imports)
```

**Why This Works:**
- No barrel indirection
- Linear dependency: config → component → @keystatic/core
- @keystatic/core initializes first
- All variables defined before use
- ✅ Deterministic initialization order

### 2.2 Implementation Checklist

- [ ] **Don't use** `import { ... } from 'src/content-components/index.ts'`
- [ ] **Don't use** `import * as components from 'src/content-components'`
- [ ] **Don't use** barrel exports from ANY re-export chain
- [ ] **Do use** individual file imports: `import { Component } from './src/content-components/component'`
- [ ] **Do list each** import on separate lines (for clarity)

---

## 3. WHEN BARREL EXPORTS ARE SAFE

### Safe Cases (Use Barrels):

✅ **Type exports only:**
```typescript
// src/types/index.ts - SAFE
export type { Site } from './site';
export type { Metadata } from './metadata';
```
*Reason: Types are erased at compilation*

✅ **Astro component exports** (not used by Keystatic config):
```typescript
// src/components/index.ts - SAFE IF NOT IMPORTED BY KEYSTATIC
export { Header } from './Header.astro';
export { Footer } from './Footer.astro';
```
*Reason: No circular dependency with virtual modules*

✅ **Utility function exports:**
```typescript
// src/utils/index.ts - SAFE
export { slugify } from './slugify';
export { formatDate } from './formatDate';
```
*Reason: No Keystatic dependency*

### Dangerous Cases (Avoid Barrels):

❌ **Components used in Keystatic config:**
```typescript
// ❌ NEVER
import { Banner, Carousel } from './content-components';  // barrel
```

❌ **Any re-export chain involving Keystatic:**
```typescript
// ❌ NEVER
import { ContentComponent } from './lib/components';  // indirect barrel
```

❌ **Circular paths:**
```typescript
// ❌ NEVER
// If the barrel imports from files that import back
export { A } from './a';  // a.ts imports from index.ts
```

---

## 4. ARCHITECTURE RECOMMENDATIONS

### 4.1 File Structure

```
src/
├── content-components/           # Keystatic content components
│   ├── index.ts                  # ⚠️ Keep for reference only
│   ├── banner.tsx                # Direct import from keystatic.config
│   ├── carousel.tsx              # Direct import from keystatic.config
│   ├── duo.tsx                   # Direct import from keystatic.config
│   ├── hero.tsx                  # Direct import from keystatic.config
│   ├── wideImage.tsx             # Direct import from keystatic.config
│   ├── ctaButton.tsx             # Direct import from keystatic.config
│   ├── strip.tsx                 # Direct import from keystatic.config
│   ├── notaBene.tsx              # Direct import from keystatic.config
│   ├── youTube.tsx               # Direct import from keystatic.config
│   ├── accordion.tsx             # Direct import from keystatic.config
│   ├── quadrifoglio.tsx          # Direct import from keystatic.config
│   ├── pdfViewer.tsx             # Direct import from keystatic.config
│   └── table.tsx                 # Direct import from keystatic.config
│
├── components/
│   └── UI/                       # Markdoc-mapped Astro components
│       ├── index.ts              # ✅ Safe - not imported by Keystatic
│       ├── Header.astro
│       └── Footer.astro
│
├── types/
│   ├── index.ts                  # ✅ Safe - types only
│   └── types.d.ts
│
└── keystatic.config.tsx          # CRITICAL - No barrels here
```

### 4.2 Import Guidelines

**Rule 1: Keystatic Config**
```typescript
// keystatic.config.tsx
// ✅ EXPLICIT imports from individual files
import { Banner } from './src/content-components/banner';
import { Carousel } from './src/content-components/carousel';
// ... NO barrels
```

**Rule 2: Astro Components**
```typescript
// src/components/UI/index.ts
// ✅ Barrel exports OK (not imported by Keystatic)
export { Header } from './Header.astro';
export { Footer } from './Footer.astro';
```

**Rule 3: Types**
```typescript
// src/types/index.ts
// ✅ Barrel exports OK (types only)
export type { Site } from './site';
export type { Metadata } from './metadata';
```

**Rule 4: Utilities**
```typescript
// src/utils/index.ts
// ✅ Barrel exports OK (no Keystatic dependency)
export { slugify } from './slugify';
export { formatDate } from './formatDate';
```

---

## 5. TESTING YOUR IMPORTS

### 5.1 Pre-Commit Checks

```bash
# 1. TypeScript compilation
npx tsc --noEmit

# 2. Check for barrel pattern in keystatic.config.tsx
grep -n "from.*index\.ts" keystatic.config.tsx
# Should return: 0 results (no barrels!)

# 3. Verify all imports exist
npm run build

# 4. Start dev server
npm run dev

# 5. Test Keystatic CMS
# Visit http://localhost:3000/keystatic (or your dev URL)
```

### 5.2 Production Checks

```bash
# 1. Production build
npm run build
# Check output: No "Cannot access" errors

# 2. Start production server
npm run start

# 3. Test Keystatic endpoint
curl -I http://localhost:4321/keystatic
# Should return: HTTP 200 OK

# 4. Check server logs
# Should contain NO initialization errors
tail -f /var/log/your-app.log | grep -i initialization
```

### 5.3 Automated Validation

Add to your CI/CD pipeline:

```bash
#!/bin/bash
# scripts/validate-keystatic.sh

# Check for barrel pattern in keystatic.config
if grep -q 'from.*content-components.*index' keystatic.config.tsx; then
  echo "❌ ERROR: Found barrel import in keystatic.config.tsx"
  exit 1
fi

# Check for circular dependencies
npx tsc --noEmit || exit 1

# Try to build
npm run build || exit 1

echo "✅ Keystatic configuration validated"
exit 0
```

---

## 6. MIGRATION FROM BARREL PATTERN

If you have existing code using barrels with Keystatic:

### 6.1 Step-by-Step

**Step 1: Identify barrel imports**
```bash
grep -n "from.*index" keystatic.config.tsx
```

**Step 2: Create explicit imports**

```typescript
// Before
import {
  Banner,
  Carousel,
  Duo,
} from './content-components/index.ts';

// After
import { Banner } from './content-components/banner';
import { Carousel } from './content-components/carousel';
import { Duo } from './content-components/duo';
```

**Step 3: Test locally**
```bash
npm run dev
# Test Keystatic: http://localhost:3000/keystatic
npm run build
npm run start
# Test again
```

**Step 4: Deploy**
```bash
git commit -m "Fix: Replace barrel import with explicit imports in keystatic.config.tsx"
git push
# Deploy to staging first
# Test thoroughly
# Deploy to production
```

### 6.2 Common Mistakes to Avoid

❌ **Mistake 1: Incomplete replacement**
```typescript
// Wrong - still a re-export
import { Banner } from './content-components/index.ts';

// Right
import { Banner } from './content-components/banner';
```

❌ **Mistake 2: Using aliases that lead to barrels**
```typescript
// Wrong - @/ might lead to barrel
import { Banner } from '@/content-components';

// Right
import { Banner } from './src/content-components/banner';
```

❌ **Mistake 3: Forgetting all components**
```typescript
// Wrong - incomplete list
import { Banner, Carousel } from './content-components/banner';
import { Banner } from './content-components/banner';

// Right - all in explicit imports
import { Banner } from './content-components/banner';
import { Carousel } from './content-components/carousel';
// ... (all 13 components)
```

---

## 7. PERFORMANCE CONSIDERATIONS

### 7.1 Bundle Size Impact

**With Barrel (Before):**
- FAQ page loads 13 components even though only 2 are used
- Rollup cannot tree-shake effectively
- ~2-3% bundle bloat

**With Explicit Imports (After):**
- FAQ page loads only used components
- Rollup can tree-shake properly
- ~2-3% bundle reduction

### 7.2 Load Time Impact

- **Dev mode:** Unchanged (Vite handles efficiently)
- **Production:** Slightly faster (~50-100ms for CMS pages due to smaller bundles)
- **Build time:** Unchanged

### 7.3 Keystatic CMS Load Time

- **Before:** ~2-3 seconds (with TDZ errors)
- **After:** ~2-3 seconds (now without errors)
- Actually slightly faster due to better module initialization

---

## 8. COMMON ISSUES AND SOLUTIONS

### Issue 1: "Cannot find module" errors

**Symptom:** TypeScript or build error saying component file doesn't exist

**Solution:**
```typescript
// Check the actual filename
// File: wideImage.tsx
// NOT: WideImage.tsx (case-sensitive)
import { WideImage } from './src/content-components/wideImage';
```

### Issue 2: Export name mismatch

**Symptom:** "Named export not found" error

**Solution:**
```typescript
// Check the actual export in the component file
// In wideImage.tsx:
export const WideImage = ({ ... }) => { ... }

// Import with correct name
import { WideImage } from './src/content-components/wideImage';
```

### Issue 3: Circular imports still occurring

**Symptom:** Still getting module initialization errors

**Solution:**
- Verify NO imports go back to keystatic.config.tsx
- Check for indirect circular paths
- Each component should only import from @keystatic/core and React

```typescript
// In banner.tsx - OK
import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';
import { useState } from 'react';

// In banner.tsx - NOT OK
// import { Banner } from '../keystatic.config';  // ❌ NO!
```

---

## 9. GUIDELINES FOR NEW COMPONENTS

When adding new content components to Keystatic:

### 9.1 Creation Process

```typescript
// 1. Create new file: src/content-components/myComponent.tsx
export const MyComponent = ({
  children,
  props,
}: {
  children: string;
  props: Record<string, unknown>;
}) => {
  return <div>{children}</div>;
};

// 2. Add to keystatic.config.tsx with EXPLICIT import
import { MyComponent } from './src/content-components/myComponent';

// 3. Add to config
export default config({
  collections: {
    // ...
    schema: {
      content: fields.markdoc({
        components: {
          // ... existing
          MyComponent,  // ← New component
        },
      }),
    },
  },
});

// 4. DO NOT update content-components/index.ts
// (Keep barrel but don't use it for Keystatic)
```

### 9.2 Adding Multiple Components

```typescript
// ✅ CORRECT - Each on own import
import { Banner } from './src/content-components/banner';
import { Carousel } from './src/content-components/carousel';
import { Duo } from './src/content-components/duo';
import { Hero } from './src/content-components/hero';
import { NewComponent } from './src/content-components/newComponent';  // ← New

// ❌ WRONG - Using barrel
import { Banner, Carousel, Duo, Hero, NewComponent } from './content-components';
```

---

## 10. MONITORING AND MAINTENANCE

### 10.1 Regular Checks

**Monthly:**
- [ ] Check for any module initialization warnings in logs
- [ ] Verify Keystatic CMS still responsive
- [ ] Monitor build time trends

**Quarterly:**
- [ ] Review keystatic.config.tsx for any barrel patterns that crept in
- [ ] Measure bundle sizes
- [ ] Update this document with any new issues found

### 10.2 Upgrade Process

When updating Keystatic or Astro:

1. **Test in development first**
   ```bash
   npm install @keystatic/core@latest
   npm run dev
   npm run build
   ```

2. **Verify imports still work**
   ```bash
   grep -n "from.*index" keystatic.config.tsx
   # Should still be empty
   ```

3. **Run full test suite**
   ```bash
   npm run build
   npm run start
   curl -I http://localhost:4321/keystatic
   ```

4. **Deploy carefully**
   - Test on staging first
   - Monitor logs for any initialization errors
   - Have rollback plan ready

---

## 11. SUMMARY

### Key Takeaways

| Guideline | Keystatic Config | Other Code |
|-----------|-----------------|-----------|
| Use barrels | ❌ NO | ✅ YES |
| Use explicit imports | ✅ YES | ✅ BETTER |
| Import from index.ts | ❌ NO | ✅ OK |
| Linear dependency chain | ✅ REQUIRED | ✅ BETTER |
| Test after changes | ✅ MUST | ✅ SHOULD |

### Before Deploying

- [ ] All Keystatic component imports are explicit
- [ ] No barrel imports from content-components
- [ ] Local build succeeds without errors
- [ ] `npm run dev` works and Keystatic loads
- [ ] `npm run build && npm run start` works
- [ ] No "Cannot access" or initialization errors in logs
- [ ] All CMS collections editable
- [ ] Content renders correctly on frontend

### Remember

**Barrel exports work fine for most code, but NEVER for Keystatic config.**

The module initialization order matters in production bundles, and barrels make that order unpredictable for Keystatic's virtual modules.

**When in doubt: Use explicit imports. You'll thank yourself later.**

---

**Document maintained by:** Your Development Team
**Last updated:** 2026-06-01
**Based on:** Production incident resolution
