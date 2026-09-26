'use strict';
/**
 * One global wall-clock budget for ALL auto-add network work (source probe + auto-add), so the
 * daily job can never run into the workflow's timeout-minutes. httpRequest() consults it before
 * every network call and every wait, and caps each fetch's timeout at the time that is left.
 */
const DEFAULT_BUDGET_MS = 6 * 60 * 1000;

class BudgetError extends Error {
    constructor(message = 'auto-add time budget exhausted') { super(message); this.name = 'BudgetError'; this.fatal = true; }
}

let deadline = Infinity;
let startedAt = 0;
let totalMs = 0;

function budgetFromEnv(env = {}) {
    const n = Number(env.AUTOADD_BUDGET_MS);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_BUDGET_MS;
}
function start(ms) { totalMs = ms; startedAt = Date.now(); deadline = startedAt + ms; }
function active() { return Number.isFinite(deadline); }
function clear() { deadline = Infinity; }
function remaining() { return deadline - Date.now(); }
// 5 ms of tolerance: a timer set for the exact remaining time may fire a hair early.
function expired() { return active() && remaining() <= 5; }
function elapsedMs() { return Date.now() - startedAt; }
function total() { return totalMs; }

module.exports = { DEFAULT_BUDGET_MS, BudgetError, budgetFromEnv, start, active, clear, remaining, expired, elapsedMs, total };
