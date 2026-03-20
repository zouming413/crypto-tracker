const DEFAULT_STRATEGIES = [
    {
        id: 'strategy_btc_default',
        token: 'BTC',
        ratio: 60,
        currentQuantity: '',
        levels: [
            { id: 'strategy_btc_default_level_1', price: 65000, action: 'buy', ratio: 9 },
            { id: 'strategy_btc_default_level_2', price: 50000, action: 'buy', ratio: 12 },
            { id: 'strategy_btc_default_level_3', price: 40000, action: 'buy', ratio: 18 },
            { id: 'strategy_btc_default_level_4', price: 30000, action: 'buy', ratio: 21 }
        ]
    },
    {
        id: 'strategy_eth_default',
        token: 'ETH',
        ratio: 30,
        currentQuantity: '',
        levels: [
            { id: 'strategy_eth_default_level_1', price: 4500, action: 'sell', ratio: 30 },
            { id: 'strategy_eth_default_level_2', price: 6000, action: 'sell', ratio: 30 },
            { id: 'strategy_eth_default_level_3', price: 1800, action: 'buy', ratio: 5 },
            { id: 'strategy_eth_default_level_4', price: 1500, action: 'buy', ratio: 6 },
            { id: 'strategy_eth_default_level_5', price: 1200, action: 'buy', ratio: 8 },
            { id: 'strategy_eth_default_level_6', price: 1000, action: 'buy', ratio: 9 }
        ]
    },
    {
        id: 'strategy_bnb_default',
        token: 'BNB',
        ratio: 10,
        currentQuantity: '',
        levels: [
            { id: 'strategy_bnb_default_level_1', price: 1200, action: 'sell', ratio: 30 },
            { id: 'strategy_bnb_default_level_2', price: 1800, action: 'sell', ratio: 30 },
            { id: 'strategy_bnb_default_level_3', price: 400, action: 'buy', ratio: 2 },
            { id: 'strategy_bnb_default_level_4', price: 300, action: 'buy', ratio: 3 },
            { id: 'strategy_bnb_default_level_5', price: 200, action: 'buy', ratio: 4 }
        ]
    }
];

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
