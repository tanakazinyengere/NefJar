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

### 2. PLAN
- Write a todo list with clear, ordered steps
- Identify which files need to change
- Consider edge cases and dark mode / accessibility
- Estimate complexity — don't over-scope

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

## System Document Benchmarks

Every build should be held against these standards:

| System | File | What It Governs |
|---|---|---|
| Color System | `COLOR SYSTEM .md` | 3-layer tokens, contrast, dark mode, no arbitrary colors |
| Design Token | `DESIGN TOKEN.md` | Token hierarchy, naming, theming, governance |
| Typography | `TYPOGRAPHY .md` | Font roles, scale, weight hierarchy, optical sizing |
| React Motion | `React Motion System.md` | Motion hierarchy, spring physics, composition, reduced motion |
| Dead Tap | `DEAD TAP READABILITY .md` | Touch targets, feedback loops, action geography |
| Post-Click | `POST-CLICK.md` | Loading → success → error → recovery lifecycle |
| Empty State | `EMPTY STATE MASTERY SYSTEM.md` | 10 state types, CTAs, accessibility, no dead ends |
| Pro Check | `Pro Check System.md` | Settings, user control, privacy, data export |
| Information Architecture | `INFORMATION ARCHITECTURE .md` | Navigation, routing, hierarchy, findability |
| Master Design Eng | `MASTER DESIGN Eng system.md` | Grid, spacing, density, responsive geometry |
| Platform Native UI | `PLATFORM NATIVE UI.md` | Platform conventions, keyboard shortcuts |
| Widescreen Layout | `Widescreen UI Layout Redesign.md` | Desktop-first, sidebar + workspace |
| Brand Identity | `BRAND IDENTITY.md` | Visual personality, consistency |
| Design Governance | `DESIGN GOVERNANCE .md` | Rules for adding tokens, colors, components |

---

## Anti-Patterns to Avoid

- ❌ Rushing through multiple files without typechecking between
- ❌ Hardcoding hex colors in components
- ❌ Using `text-white` on backgrounds that change between themes
- ❌ Creating buttons without onClick handlers
- ❌ Declaring a system "done" without verifying it works in the browser
- ❌ Skipping the analyze-against-goals step
- ❌ Stopping before all tasks in a session are complete

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
