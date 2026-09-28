# Build 87 sample manager packet

Case: Blue Wattle Pty Ltd — June 2026 close readiness
Client context: 28-employee trades services group; payroll, BAS, and director loan evidence required before close.
Prepared by: Mason Ng, staff operator
Reviewed by: Amara Lee, reviewer
Generated from: deterministic browser-state export; synthetic sample only.
Boundary: no client data; no production SaaS claim; event hash is demo integrity trail only.

## Close decision
Before review: cannot close — 3 blockers are not packet-ready.
After PAY-001 reviewer acceptance: cannot close — 2 blockers remain.

## Accepted evidence table
| ID | Evidence | Source system | Risk/materiality | Decision | Reviewer | Packet consequence |
|---|---|---|---|---|---|---|
| PAY-001 | Payroll variance support | Payroll export + client explanation | High; 14% above prior month | Accepted after reviewer action | Amara Lee | Included in manager packet; excluded from chase |

## Unresolved blocker table
| ID | Status | Owner | Ageing | Source system | Reason | Next action |
|---|---|---|---|---|---|---|
| BAS-002 | rejected/problem | Staff | 1 day | ATO portal export | Wrong period: May instead of June | Chase corrected June BAS export |
| LOAN-003 | missing | Client | 2 days | Client bank/loan portal | Not received | Ask client for statement |

## Prior-period / before-after diff
- PAY-001 before Step 3: waiting-review, excluded from packet and chase.
- PAY-001 after Step 3: accepted, included in packet and excluded from chase.
- BAS-002 and LOAN-003 remain blockers throughout.

## Review sign-off fields
Prepared by: Mason Ng. Reviewed by: Amara Lee. Manager sign-off: sample-only pending.

## Audit appendix
- EV-87-001 Staff intake received three not-packet-ready items; close has 3 blockers before review.
- EV-87-002 Refused non-reviewer accept attempt; no state changed.
- EV-87-003 Reviewer accepted PAY-001; blockers reduced from 3 to 2.
- EV-87-004 Staff approved 2-blocker chase; accepted items excluded.
