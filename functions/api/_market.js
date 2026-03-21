export const TOKEN_TICKERS = {
    BTC: 'BTC-USDT',
    ETH: 'ETH-USDT',
    BNB: 'BNB-USDT',
    AAVE: 'AAVE-USDT',
    SKY: 'SKY-USDT',
    HYPE: 'HYPE-USDT',
    SOL: 'SOL-USDT',
    UNI: 'UNI-USDT',
    PENDLE: 'PENDLE-USDT',
    APT: 'APT-USDT'
};

const OKX_TICKER_ENDPOINT = 'https://www.okx.com/api/v5/market/ticker';

export async function fetchTokenPrices(tokens = Object.keys(TOKEN_TICKERS), fetchImpl = fetch) {
    const uniqueTokens = [...new Set(tokens)].filter(token => TOKEN_TICKERS[token]);

    const entries = await Promise.allSettled(
        uniqueTokens.map(async token => {
            const instId = TOKEN_TICKERS[token];
            const response = await fetchImpl(`${OKX_TICKER_ENDPOINT}?instId=${encodeURIComponent(instId)}`, {
                headers: {
                    accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Ticker request failed for ${instId}`);
            }

            const payload = await response.json();
            const ticker = Array.isArray(payload?.data) ? payload.data[0] : null;
            const lastPrice = Number.parseFloat(ticker?.last);

            if (payload?.code !== '0' || !Number.isFinite(lastPrice) || lastPrice <= 0) {
                throw new Error(`Ticker payload invalid for ${instId}`);
            }

            return {
                token,
                price: lastPrice,
                updatedAt: Number.parseInt(ticker.ts, 10) || Date.now()
            };
        })
    );

    const prices = {};
    let latestTimestamp = 0;

    entries.forEach(entry => {
        if (entry.status !== 'fulfilled') {
            return;
        }

        prices[entry.value.token] = entry.value.price;
        latestTimestamp = Math.max(latestTimestamp, entry.value.updatedAt);
    });

    return {
        ok: Object.keys(prices).length > 0,
        source: 'OKX',
        prices,
        updatedAt: latestTimestamp ? new Date(latestTimestamp).toISOString() : null
    };
}
