'use strict';
(function () {
  var root = document.querySelector('[data-simulator-root]');
  if (!root) return;
  var ledgerEl = root.querySelector('[data-sim-ledger]');
  var chaseEl = root.querySelector('[data-sim-chase]');
  var packetEl = root.querySelector('[data-sim-packet]');
  var auditEl = root.querySelector('[data-sim-audit]');
  var statusEl = root.querySelector('[data-sim-status]');
  var blockersEl = root.querySelector('[data-sim-blockers]');
  var waitingEl = root.querySelector('[data-sim-waiting]');
  var acceptedEl = root.querySelector('[data-sim-accepted]');
  var packetStatusEl = root.querySelector('[data-sim-packet-status]');
  var buttons = Array.prototype.slice.call(root.querySelectorAll('[data-step]'));
  var base = [
    { name: 'Corrected August bank statement', status: 'missing', reason: 'July statement cannot close August', chase: true, packet: false },
    { name: 'Contractor invoices', status: 'received', reason: 'Waiting reviewer check', chase: false, packet: false },
    { name: 'Payroll/PAYG report', status: 'missing', reason: 'Not yet received', chase: true, packet: false },
    { name: 'Readable supplier invoice', status: 'unresolved', reason: 'Photo is illegible', chase: true, packet: false },
    { name: 'Credit card statement', status: 'received', reason: 'New evidence not reviewed', chase: false, packet: false }
  ];
  function cloneBase() { return base.map(function (x) { return Object.assign({}, x); }); }
  function makeState(step) {
    var items = cloneBase();
    var audit = ['Start blocked: case cannot close; staff sees named blockers.'];
    var chaseApproved = false;
    var packetGenerated = false;
    if (step >= 1) audit.push('Staff accept denied: Mason tries to accept contractor invoices, but reviewer-only acceptance blocks the change.');
    if (step >= 2) { items[1].status = 'waiting-review'; items[4].status = 'waiting-review'; audit.push('Route to reviewer: contractor invoices and card statement move to Amara Lee queue; both are paused from chase and packet.'); }
    if (step >= 3) { items[1].status = 'accepted'; items[1].reason = 'Reviewer accepts: period, entity, ABN and requirement match'; items[1].packet = true; audit.push('Reviewer accepts contractor invoices: packet-ready and excluded from chase.'); }
    if (step >= 4) { items[0].status = 'rejected'; items[0].reason = 'Reviewer rejects: wrong period'; items[0].chase = true; audit.push('Reviewer rejects bank statement: corrected August statement stays chaseable and cannot enter packet.'); }
    if (step >= 5) { items[3].status = 'cannot-determine'; items[3].reason = 'Cannot determine: unreadable supplier image'; items[3].chase = true; audit.push('Cannot determine supplier invoice: readable copy required before close.'); }
    if (step >= 6) audit.push('Chase list recomputed from state: accepted invoices and waiting-review card statement are excluded.');
    if (step >= 7) { chaseApproved = true; audit.push('Simulated send requires staff approval: Mason approves local demo chase; no real email is sent.'); }
    if (step >= 8) { packetGenerated = true; audit.push('Packet preview updates: accepted evidence, unresolved blockers, waiting-review holds, chase history, and export-integrity proof are shown together.'); }
    return { items: items, audit: audit, chaseApproved: chaseApproved, packetGenerated: packetGenerated };
  }
  function li(text) { var node = document.createElement('li'); node.textContent = text; return node; }
  function fill(list, values) { list.textContent = ''; values.forEach(function (v) { list.appendChild(li(v)); }); }
  function render(step) {
    var s = makeState(step);
    var accepted = s.items.filter(function (x) { return x.status === 'accepted'; });
    var waiting = s.items.filter(function (x) { return x.status === 'waiting-review'; });
    var open = s.items.filter(function (x) { return x.status !== 'accepted'; });
    var chase = s.items.filter(function (x) { return x.chase && x.status !== 'accepted' && x.status !== 'waiting-review'; });
    fill(ledgerEl, s.items.map(function (x) { return x.name + ' — ' + x.status + ' (' + x.reason + ')'; }));
    fill(chaseEl, chase.map(function (x) { return x.name + ' — ' + x.reason; }).concat(s.chaseApproved ? ['Communication thread: staff-approved simulated chase recorded; no auto-send.'] : ['Send blocked until staff approval.']));
    fill(packetEl, accepted.map(function (x) { return x.name + ' — included as accepted evidence.'; }).concat(open.map(function (x) { return x.name + ' — not done; status is ' + x.status + '.'; }), s.packetGenerated ? ['Export integrity proof: export-integrity-signature.json remains the local verifier reference.'] : ['Packet handoff not generated yet.']));
    fill(auditEl, s.audit);
    statusEl.textContent = open.length ? 'NOT CLOSE-READY' : 'CLOSE-READY';
    statusEl.className = open.length ? 'pill block' : 'pill ready';
    blockersEl.textContent = open.length + ' open blockers';
    waitingEl.textContent = waiting.length + ' waiting review';
    acceptedEl.textContent = accepted.length + ' packet-ready';
    packetStatusEl.textContent = open.length ? 'Packet blocked: unresolved and waiting items remain explicit.' : 'Packet ready: no unresolved blockers remain.';
    packetStatusEl.className = open.length ? 'sim-status' : 'sim-status ready';
    buttons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-step') === String(step)); });
  }
  buttons.forEach(function (button) { button.addEventListener('click', function () { render(Number(button.getAttribute('data-step') || 0)); }); });
  render(0);
}());
