# Build 76 public static deployment

Deploy only the contents of build76-public-buyer-demo/. Do not deploy build76-local-verifier-pack/, audit-only registries, local runtime files, API routes, forms, credentials or mutable endpoints.

GitHub Pages is a durable public static mirror only. It is not strict-header proof unless the live response actually returns the required headers.

Run: node mvp-core/tests/run-build76-public-fetchback-gate.js <BASE_URL> before any public claim.
