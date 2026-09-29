# Evidence Assistant Pilot Package v1 authority

This public package is the source of truth for buyer-facing Evidence Assistant evaluation.

## Source of truth
- Use this package for public/demo/buyer walkthroughs.
- It is a static supervised-pilot package, not mutable SaaS.
- Later private-pilot/backend hardening work contributes safety lessons only; it does not replace the buyer journey.

## Preserved safety lessons
- Staff intake is collection, not acceptance.
- Reviewer-only acceptance controls packet readiness.
- Accepted evidence is not re-chased.
- Cross-tenant or hidden mutation attempts must be refused in future private-pilot engineering.
- Real client data requires written permission and private deployment controls.

## Claims allowed
- Public static supervised-pilot package.
- Buyer can inspect pilot offer, workflow simulation, agreement outline, scorecard, setup packet and diligence proof.
- Comparison evidence is partial and honest.

## Claims not allowed
- Production SaaS.
- Real-client-data readiness.
- Tenant auth/SSO/storage/integration readiness.
- Strict-header hosting proof on GitHub Pages.
- Paid validation or measured ROI.
- Complete superiority over ChatGPT, Claude, Airtable, Karbon, TaxDome or spreadsheets.


Pilot Package v1 primary feature surface: `close-workspace.html` — the accountant-first close verdict, blocker ownership, safe action rail and manager handoff preview.
