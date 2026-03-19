import { ensureStateRow, isAuthorized, json, normalizeSnapshot } from './_shared.js';

export async function onRequestGet(context) {
    const { request, env } = context;

    if (!env.DB) {
        return json({ error: 'Database binding missing' }, { status: 503 });
    }

    if (!isAuthorized(request, env)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ensureStateRow(env.DB);

    const row = await env.DB.prepare(`
        SELECT payload, updated_at
        FROM app_state
        WHERE id = 1
    `).first();

    let state = normalizeSnapshot();
    if (row?.payload) {
        try {
            state = normalizeSnapshot(JSON.parse(row.payload));
        } catch {
            state = normalizeSnapshot();
        }
    }

    return json({
        state,
        updatedAt: row?.updated_at || null
    });
}

export async function onRequestPut(context) {
    const { request, env } = context;

    if (!env.DB) {
        return json({ error: 'Database binding missing' }, { status: 503 });
    }

    if (!isAuthorized(request, env)) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const state = normalizeSnapshot(body?.state);
    await ensureStateRow(env.DB);

    await env.DB.prepare(`
        UPDATE app_state
        SET payload = ?1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
    `).bind(JSON.stringify(state)).run();

    const row = await env.DB.prepare(`
        SELECT updated_at
        FROM app_state
        WHERE id = 1
    `).first();

    return json({
        ok: true,
        updatedAt: row?.updated_at || null
    });
}
