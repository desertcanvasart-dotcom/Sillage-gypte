// Enquiries → Autoura (2026-11-13). Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { enquiryReference, sendLeadToAutoura, signedHeaders, toAutouraLead } from '../lib/autoura-lead.ts';

const plan = { name: 'Claire Martin', email: 'claire@example.fr', phone: '+33 6 12 34 56 78', country: 'France', when: 'Spring 2027', exactDate: '2027-04-02', length: '10–12 nights', party: '2 adults', budget: '€8,000+', interests: ['Nile', 'Desert'], message: 'Anniversary trip' };

test('reference: SIL- and 6 unambiguous characters', () => {
  assert.match(enquiryReference(), /^SIL-[A-HJ-NP-Z2-9]{6}$/);
});

test('the plan form becomes the body Autoura reads', () => {
  const b = toAutouraLead('SIL-ABCDEF', plan, 'https://sillage-egypte.com/plan');
  assert.equal(b.brand, 'sillage');
  assert.equal(b.name, 'Claire Martin');
  assert.equal(b.whatsapp, '+33 6 12 34 56 78');
  assert.equal(b.start_date, '2027-04-02');
  assert.equal(b.adults, 2);
  assert.deepEqual(b.style_answer, ['Nile', 'Desert']);
  assert.match(b.notes, /^Anniversary trip\n\nPlanned date: Spring 2027\nTravelling: 2 adults\nBased in: France$/);
});

test('the contact form (dates, groupSize, journey) too; a non-date stays out of start_date', () => {
  const b = toAutouraLead('SIL-ABCDEF', { name: 'A', email: 'a@x.com', dates: 'late March', groupSize: '4', journey: 'Classic Nile', message: 'hi', exactDate: 'soon' }, null);
  assert.equal(b.start_date, null);
  assert.equal(b.adults, 4);
  assert.equal(b.journey, 'Classic Nile');
  assert.match(b.notes, /Dates: late March/);
});

const deps = (replies, calls) => ({
  url: 'https://getautoura.net/api/webhooks/website-lead', secret: 's3cret',
  post: async (_u, headers, body) => { calls.push({ headers, body }); const st = replies.shift() ?? null; return { httpStatus: st, response: null }; },
  sleep: async () => {}, nowSeconds: () => 1_700_000_000, requestId: () => 'r1',
});

test('signed over the exact bytes sent', async () => {
  const calls = [];
  const r = await sendLeadToAutoura({ a: 1 }, deps([200], calls));
  assert.equal(r.status, 'sent');
  const v1 = createHmac('sha256', 's3cret').update(`1700000000.${calls[0].body}`).digest('hex');
  assert.equal(calls[0].headers['X-Autoura-Signature'], `t=1700000000,v1=${v1}`);
  assert.deepEqual(signedHeaders('s3cret', '{}', 1, 'x')['X-Autoura-Timestamp'], '1');
});

test('retries a 5xx and a network error, stops on a 4xx, gives up after 3, skips without a secret', async () => {
  let calls = [];
  assert.deepEqual([(await sendLeadToAutoura({}, deps([500, null, 200], calls))).status, calls.length], ['sent', 3]);
  calls = [];
  assert.deepEqual([(await sendLeadToAutoura({}, deps([422, 200], calls))).status, calls.length], ['failed', 1]);
  calls = [];
  assert.equal((await sendLeadToAutoura({}, deps([503, 503, 503], calls))).attempts, 3);
  assert.equal((await sendLeadToAutoura({}, { ...deps([200], []), secret: null })).status, 'skipped');
});
