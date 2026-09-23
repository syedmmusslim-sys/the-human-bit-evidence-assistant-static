#!/usr/bin/env node
// Build 36 public/static export bundle verifier.
// Boundary: verifies local/static export integrity only. It does not upload files,
// approve evidence, send email, notarise records, or provide production identity signing.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const bundleDir = path.resolve(process.argv[2] || 'build36-export-bundle');
const signaturePath = path.join(bundleDir, 'export-integrity-signature.json');
function canonicalJson(value) {
  if (Array.isArray(value)) return '[' + value.map(canonicalJson).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map((key) => JSON.stringify(key) + ':' + canonicalJson(value[key])).join(',') + '}';
  return JSON.stringify(value);
}
function sha256Hex(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }
function fail(message) { console.error('EXPORT_INTEGRITY_FAIL ' + message); process.exit(1); }
if (!fs.existsSync(bundleDir)) fail('bundle directory does not exist: ' + bundleDir);
if (!fs.existsSync(signaturePath)) fail('missing export-integrity-signature.json');
let signatureDoc;
try { signatureDoc = JSON.parse(fs.readFileSync(signaturePath, 'utf8')); } catch (err) { fail('signature file is not valid JSON: ' + err.message); }
if (signatureDoc.build !== 'build-36') fail('expected build-36, found ' + signatureDoc.build);
if (signatureDoc.algorithm !== 'Ed25519') fail('unsupported algorithm: ' + signatureDoc.algorithm);
if (signatureDoc.hash_algorithm !== 'SHA-256') fail('unsupported hash algorithm: ' + signatureDoc.hash_algorithm);
if (!Array.isArray(signatureDoc.signed_files) || signatureDoc.signed_files.length < 1) fail('signed_files missing or empty');
if (!/not a production identity signature/i.test(signatureDoc.boundary || '')) fail('boundary does not refuse production identity signing');
for (const file of signatureDoc.signed_files) {
  if (!file || typeof file.name !== 'string') fail('signed_files entry missing name');
  if (file.name.includes('/') || file.name.includes('\\') || file.name === 'export-integrity-signature.json') fail('unsafe signed file name: ' + file.name);
  const abs = path.join(bundleDir, file.name);
  if (!fs.existsSync(abs)) fail('signed file missing: ' + file.name);
  const bytes = fs.readFileSync(abs);
  if (bytes.length !== file.bytes) fail('byte mismatch for ' + file.name + ': expected ' + file.bytes + ', got ' + bytes.length);
  const actual = sha256Hex(bytes);
  if (actual !== file.sha256) fail('sha256 mismatch for ' + file.name + ': expected ' + file.sha256 + ', got ' + actual);
}
const payload = { build: signatureDoc.build, purpose: signatureDoc.purpose, boundary: signatureDoc.boundary, algorithm: signatureDoc.algorithm, hash_algorithm: signatureDoc.hash_algorithm, signed_files: signatureDoc.signed_files };
const payloadBytes = Buffer.from(canonicalJson(payload));
const actualPayloadHash = sha256Hex(payloadBytes);
if (actualPayloadHash !== signatureDoc.signed_payload_sha256) fail('signed payload hash mismatch: expected ' + signatureDoc.signed_payload_sha256 + ', got ' + actualPayloadHash);
let publicKey;
try { publicKey = crypto.createPublicKey(signatureDoc.public_key_pem); } catch (err) { fail('public key cannot be parsed: ' + err.message); }
const signature = Buffer.from(signatureDoc.signature_base64 || '', 'base64');
if (!signature.length) fail('signature_base64 missing');
if (!crypto.verify(null, payloadBytes, publicKey, signature)) fail('Ed25519 signature verification failed');
console.log('EXPORT_INTEGRITY_PASS build-36 ' + signatureDoc.signed_files.length + ' files ' + actualPayloadHash);
