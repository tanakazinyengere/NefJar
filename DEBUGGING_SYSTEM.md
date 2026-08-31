# DEBUGGING MASTER SYSTEM
## Universal Engineering Standard for Premium, Reliable, Production-Grade Apps

This system is now active and deeply integrated into all NefJar development.

## Core Directive
1. What is broken?
2. Where is it broken?
3. Why did it break?
4. What assumptions allowed it to break?
5. What other systems depend on the broken component?
6. What other flows may therefore also be broken?
7. What states and edge cases trigger the defect?
8. What is the safest root-level fix?
9. What could the fix itself break?
10. How do we prove the fix works?
11. How do we prove related functionality still works?
12. How do we prevent the same class of bug from returning?

## The Debugging Loop
OBSERVE → REPRODUCE → ISOLATE → TRACE → HYPOTHESIZE → VERIFY → ROOT CAUSE → BLAST RADIUS → FIX → TEST → REGRESSION → VERIFY END-TO-END → HARDEN → DOCUMENT

## Five Levels of Debugging
- Level 1: SYMPTOM — What does the user see?
- Level 2: FAILURE — What technically fails?
- Level 3: ROOT CAUSE — Why?
- Level 4: SYSTEMIC CAUSE — Why was that possible?
- Level 5: PREVENTION — How do we ensure the class of bug does not return?

## Severity Classification
- P0 Critical: Security breach, catastrophic data loss, entire app unavailable
- P1 Severe: Major workflow broken, many users blocked
- P2 Moderate: Significant feature malfunction, workaround exists
- P3 Minor: Cosmetic, limited edge case

## Golden Rules
1. Symptoms are not roots
2. Every bug has a blast radius
3. Trace dependencies, not just files
4. Test failure paths, not only happy paths
5. Never declare "fixed" without verification
6. Every important bug creates a regression defense
7. A graceful failure is better than a silent failure
8. The goal is increased system reliability

## Agent Protocol
1. Understand the reported symptom
2. Identify expected vs actual behavior
3. Reproduce where possible
4. Locate the relevant code
5. Trace dependencies and state
6. Identify root cause
7. Determine blast radius
8. Design smallest correct root-level fix
9. Implement
10. Run targeted verification
11. Run regression tests
12. Test edge cases
13. Build/typecheck/lint
14. Confirm no regressions
15. Report exactly what changed and what was verified
