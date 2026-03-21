import { fetchTokenPrices } from './_market.js';
import { json } from './_shared.js';

export async function onRequestGet() {
    const result = await fetchTokenPrices();

    return json(result, {
        status: result.ok ? 200 : 502
    });
}
