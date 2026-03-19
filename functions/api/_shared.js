const DEFAULT_STRATEGIES = {
    BTC: {
        name: 'BTC',
        ratio: 0.6,
        levels: [
            { price: 65000, action: '买入', ratio: 0.15 },
            { price: 50000, action: '买入', ratio: 0.20 },
            { price: 40000, action: '买入', ratio: 0.30 },
            { price: 30000, action: '买入', ratio: 0.35 }
        ]
    },
    ETH: {
        name: 'ETH',
        ratio: 0.3,
        levels: [
            { price: 4500, action: '卖出', ratio: 0.30 },
            { price: 6000, action: '卖出', ratio: 0.30 },
            { price: 1800, action: '买入', ratio: 0.15 },
            { price: 1500, action: '买入', ratio: 0.20 },
            { price: 1200, action: '买入', ratio: 0.25 },
            { price: 1000, action: '买入', ratio: 0.30 }
        ]
    },
    BNB: {
        name: 'BNB',
        ratio: 0.1,
        levels: [
            { price: 1200, action: '卖出', ratio: 0.30 },
            { price: 1800, action: '卖出', ratio: 0.30 },
            { price: 400, action: '买入', ratio: 0.20 },
            { price: 300, action: '买入', ratio: 0.30 },
            { price: 200, action: '买入', ratio: 0.40 }
        ]
    }
};

export function json(data, init = {}) {
    const headers = new Headers(init.headers || {});
    headers.set('content-type', 'application/json; charset=utf-8');
    headers.set('cache-control', 'no-store');

    return new Response(JSON.stringify(data), {
        ...init,
        headers
    });
}

export function isAuthorized(request, env) {
    return true;
}

export function normalizeSnapshot(snapshot = {}) {
    return {
        fixedIncome: Array.isArray(snapshot.fixedIncome) ? snapshot.fixedIncome : [],
        totalAmount: snapshot.totalAmount === undefined || snapshot.totalAmount === null ? '' : String(snapshot.totalAmount),
        strategies: snapshot.strategies && typeof snapshot.strategies === 'object' ? snapshot.strategies : DEFAULT_STRATEGIES
    };
}

export async function ensureStateRow(db) {
    await db.prepare(`
        CREATE TABLE IF NOT EXISTS app_state (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            payload TEXT NOT NULL,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    await db.prepare(`
        INSERT INTO app_state (id, payload)
        VALUES (1, '{}')
        ON CONFLICT(id) DO NOTHING
    `).run();
}
