# Evidence Assistant Build 36 verifier pack

This public verifier pack lets a buyer or reviewer run the export-integrity check locally.

## Files

- `export-bundle-verifier.mjs` — downloadable verifier.
- `VERIFIER-PACK-README.md` — these downloadable proof instructions.
- The export bundle must contain `export-integrity-signature.json`.

## Run

```bash
node export-bundle-verifier.mjs build36-export-bundle
```

Expected success begins with:

```
EXPORT_INTEGRITY_PASS build-36 10 files
```

If a signed file is changed after export, the verifier prints `EXPORT_INTEGRITY_FAIL` and exits non-zero.

## Boundary

The verifier does not upload files, approve evidence, send email, notarise records, or make this static walkthrough mutable SaaS. It is not production identity signing, legal-grade non-repudiation, key custody, timestamping, or production client-data approval.
