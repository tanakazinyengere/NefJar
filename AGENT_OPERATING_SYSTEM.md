# NefJar — Agent Operating System

## Core Principle: Take Your Time

Rushing creates errors and doesn't allow room to analyse. Every task follows this cycle:

---

## The Build Cycle

### 1. MAP
Before writing any code:
- Read and understand the full request
- Read all relevant existing code
- Understand the current state of the system
- Identify dependencies and side effects
- **Run the Debugging Master System if any bug is suspected** — never patch symptoms blindly

### 2. PLAN
- Write a todo list with clear, ordered steps
- Identify which files need to change
- Consider edge cases, dark mode, accessibility
- Estimate complexity — don't over-scope
- **Classify bug severity** if debugging (P0-P3)

### 3. BUILD
- Implement changes methodically, one file at a time
- Use the design token system — never hardcode values
- Use semantic tokens, not raw hex colors
- Follow existing patterns in the codebase
- Prefer editing existing files over creating new ones

### 4. TYPECHECK
- Run `npm run build` (includes `tsc -b`)
- Read every error carefully
- Fix each error before moving on
- Do NOT skip typecheck — it catches real bugs

### 5. LINT / ANALYZE
- Search for remaining hardcoded values (hex, rgba, arbitrary px)
- Check dark mode contrast — do semantic tokens resolve correctly in both themes
- Check for dead buttons / missing onClick handlers
- Check for unused imports
- Check accessibility (aria labels, heading hierarchy, focus states)

### 6. TYPECHECK AGAIN
- After fixes, rebuild and verify clean output
- No warnings, no errors

### 7. ANALYZE AGAINST GOALS
- Read the original request / system document
- Check each requirement against what was built
- Is it actually complete or just superficially done?
- Are there gaps? If yes, go back to step 3

### 8. VERIFY IN BROWSER
- Use preview tools to visually confirm
- Test interactions (click, navigate, dark mode toggle)
- Check that nothing is broken

### 9. COMMIT
- Meaningful commit message explaining WHY, not just WHAT
- Push to GitHub

### 10. PICK UP REMAINDERS
- Check if any tasks from the session were incomplete
- Check if the original request had multiple parts
- Don't stop until everything is addressed

---

## Debugging Protocol (ACTIVE)

When any bug is found or suspected, follow the Debugging Master System:

### The 5 Levels
1. SYMPTOM — What does the user see?
2. FAILURE — What technically fails?
3. ROOT CAUSE — Why?
4. SYSTEMIC CAUSE — Why was that possible?
5. PREVENTION — How do we prevent recurrence?

### The Loop
OBSERVE → REPRODUCE → ISOLATE → TRACE → HYPOTHESIZE → VERIFY → ROOT CAUSE → BLAST RADIUS → FIX → TEST → REGRESSION → VERIFY END-TO-END → HARDEN → DOCUMENT

### Severity
- P0 Critical: Security, data loss, app down
- P1 Severe: Major workflow broken
- P2 Moderate: Feature malfunction, workaround exists
- P3 Minor: Cosmetic

### Never
- Patch symptoms without finding root cause
- Declare "fixed" without verification
- Ignore blast radius
- Test only the happy path
- Skip regression testing

### Always
- Trace dependencies, not just files
- Trace data, state, identity, and lifecycle
- Test failure paths
- Create regression defense for important bugs
- Report: BUG → ROOT CAUSE → IMPACT → FIX → VERIFICATION → REGRESSION → REMAINING RISK → STATUS

---

## Dark/Light Mode Protocol (ACTIVE)

Light Mode and Dark Mode are first-class product states.

### Rules
1. Dark Mode is NOT Light Mode × -1 — independent visual reasoning
2. Both modes get equal design attention
3. Use semantic tokens (purpose, not appearance)
4. No hardcoded theme-dependent colors
5. Theme switching preserves application state
6. Both modes independently pass accessibility
7. Color is never the only state indicator
8. No theme leakage (wrong-colored surfaces)

### Token Architecture
- Layer 1: Primitive tokens (raw values)
- Layer 2: Semantic tokens (purpose)
- Layer 3: Component tokens (specific components)
- Layer 4: Contextual tokens (specialized surfaces)

---

## System Document Benchmarks

Every build is held against these standards:

| System | File | Status |
|---|---|---|
| Color System | `COLOR SYSTEM .md` | Active |
| Design Token | `DESIGN TOKEN.md` | Active |
| Typography | `TYPOGRAPHY .md` | Active |
| React Motion | `React Motion System.md` | Active |
| Dead Tap | `DEAD TAP READABILITY .md` | Active |
| Post-Click | `POST-CLICK.md` | Active |
| Empty State | `EMPTY STATE MASTERY SYSTEM.md` | Active |
| Pro Check | `Pro Check System.md` | Active |
| Information Architecture | `INFORMATION ARCHITECTURE .md` | Active |
| Master Design Eng | `MASTER DESIGN Eng system.md` | Active |
| Platform Native UI | `PLATFORM NATIVE UI.md` | Active |
| Widescreen Layout | `Widescreen UI Layout Redesign.md` | Active |
| Brand Identity | `BRAND IDENTITY.md` | Active |
| Design Governance | `DESIGN GOVERNANCE .md` | Active |
| **Debugging Master System** | `DEBUGGING_SYSTEM.md` | **ACTIVE — HIGHEST PRIORITY** |
| **Dark/Light Mode System** | `DARK_LIGHT_MODE_SYSTEM.md` | **ACTIVE** |

---

## Anti-Patterns to Avoid

- ❌ Rushing through multiple files without typechecking between
- ❌ Hardcoding hex colors in components
- ❌ Using `text-white` on backgrounds that change between themes
- ❌ Creating buttons without onClick handlers
- ❌ Declaring a system "done" without verifying it works in the browser
- ❌ Skipping the analyze-against-goals step
- ❌ Stopping before all tasks in a session are complete
- ❌ Patching symptoms without finding root cause
- ❌ Testing only happy paths
- ❌ Ignoring blast radius of changes
- ❌ Declaring "fixed" without evidence

---

## Quality Gates

Before any commit:
- [ ] TypeScript: zero errors
- [ ] Build: clean, no warnings
- [ ] No hardcoded colors (search for `#[0-9a-fA-F]{6}`, `rgba(`, `bg-[#`)
- [ ] Dark mode: every text/bg combination has sufficient contrast
- [ ] All buttons have functional onClick
- [ ] All empty states have CTAs
- [ ] Accessibility: focus visible, aria labels, heading hierarchy
- [ ] Preview: visually confirmed in browser
- [ ] Debugging: if any bug was fixed, root cause identified and regression tested
