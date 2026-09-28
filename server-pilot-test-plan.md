# Build 88 server-side pilot test plan

- staff accept attempt returns 403, status unchanged, event cites R-ROLE-01.
- cross-tenant evidence read returns 404/403 with no existence leak.
- duplicate chase send returns 409 and preserves original event.
- tampered previous_event_hash blocks packet generation.
- client upload cannot mutate status.
- server recomputes packet/chase eligibility; browser state is not trusted.
