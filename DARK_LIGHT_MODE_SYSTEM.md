# DARK/LIGHT MODE MASTER SYSTEM
## First-Class Product State System

Light Mode and Dark Mode are first-class product states — not cosmetic features.
Both must be designed, engineered, tested, monitored, and governed with the same seriousness as navigation, authentication, payments, and data.

## Core Principle
"The product possesses two coherent, accessible, performant, psychologically intentional, technically robust visual environments that feel native to the same brand."

## Key Rules
1. Dark Mode is NOT Light Mode × -1 — it requires independent visual reasoning
2. Light Mode should NOT be the "second-class" mode — both get equal attention
3. Never use pure black everywhere — use near-black, deep charcoal, dark neutral
4. Create semantic tokens (purpose, not appearance)
5. Every theme must independently pass accessibility review
6. Color is not the only state indicator — use color + icon + text + structure
7. Never hardcode appearance-dependent values where semantic tokens should exist
8. Theme switching must feel instantaneous — no flashing, no layout shifts
9. Preserve application state during theme switching
10. Both themes must feel intentionally designed

## Token Architecture (4 layers)
1. Primitive tokens — raw values (neutral-0 to neutral-1000)
2. Semantic tokens — map to meaning (background-primary, text-primary, etc.)
3. Component tokens — button-primary-background, card-background, etc.
4. Contextual tokens — editor-background, chart-grid, etc.

## Agent Implementation Order
1. Establish primitives
2. Establish semantic tokens
3. Establish theme mappings
4. Establish component tokens
5. Refactor global surfaces
6. Refactor typography
7. Refactor controls
8. Refactor navigation
9. Refactor overlays
10. Refactor specialized surfaces
11. Refactor assets
12. Integrate system preference
13. Integrate persistence
14. Add transition behavior
15. Add accessibility handling
16. Test both themes
17. Regression test
18. Polish

## Agent Self-Check Before Completion
- [ ] Every major screen tested in Light Mode
- [ ] Every major screen tested in Dark Mode
- [ ] Interaction states tested
- [ ] Focus states tested
- [ ] Contrast checked
- [ ] No remaining hardcoded theme-dependent colors
- [ ] Icons reviewed
- [ ] Images reviewed
- [ ] Modals and overlays checked
- [ ] Loading/error/success states checked
- [ ] System preference handled
- [ ] Persistence verified
- [ ] Theme switching preserves application state
- [ ] Both modes feel intentionally designed
