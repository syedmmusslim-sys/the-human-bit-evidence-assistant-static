# Evidence Assistant Pilot Package v1 public static deployment

Deploy only the contents of `evidence-assistant-pilot-package-v1-public/`.

This is the buyer-facing source of truth: a public static/read-only supervised-pilot package with a pilot offer, workflow simulation, agreement outline, scorecard, pilot setup packet and diligence appendix.

Do not deploy local verifier packs, local runtime files, API routes, forms, credentials, mutable endpoints, proof harnesses, or private-pilot/backend experiments as the public product surface.

Before any public claim, run:

`node mvp-core/tests/run-pilot-package-v1-public-fetchback-gate.js <BASE_URL>`


Pilot Package v1 primary feature surface: `close-workspace.html` — the accountant-first close verdict, blocker ownership, safe action rail and manager handoff preview.
