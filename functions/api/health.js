import { json } from './_shared.js';

export async function onRequestGet({ env }) {
    return json({
        ok: true,
        configured: Boolean(env.DB)
    });
}
