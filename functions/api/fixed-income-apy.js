import { json } from './_shared.js';

const ETHEREUM_RPC_ENDPOINT = 'https://ethereum-rpc.publicnode.com';
const STK_AAVE_CONTRACT = '0x4da27a545c0c5b758a6ba100e3a049001de870f5';
const TOTAL_SUPPLY_CALLDATA = '0x18160ddd';
const ASSET_DATA_CALLDATA = '0xf11b81880000000000000000000000004da27a545c0c5b758a6ba100e3a049001de870f5';
const SECONDS_PER_YEAR = 31_536_000n;
const PERCENT_SCALE = 1_000_000n;

export async function onRequestGet(context) {
    const { request } = context;
    const url = new URL(request.url);
    const token = String(url.searchParams.get('token') || '').trim().toUpperCase();
    const platform = String(url.searchParams.get('platform') || '').trim().toLowerCase();

    if (token !== 'AAVE' || platform !== 'aave') {
        return json({
            ok: false,
            error: 'Unsupported token/platform pair'
        }, {
            status: 400
        });
    }

    try {
        const apy = await fetchStakeAaveApr();

        return json({
            ok: true,
            source: 'aave-safety-module-stake-aave',
            token: 'AAVE',
            platform: 'Aave',
            apy,
            fetchedAt: new Date().toISOString(),
            contractAddress: STK_AAVE_CONTRACT
        });
    } catch (error) {
        return json({
            ok: false,
            error: 'Unable to fetch Aave Safety Module APR'
        }, {
            status: 502
        });
    }
}

async function fetchStakeAaveApr(fetchImpl = fetch) {
    const [totalSupplyHex, assetDataHex] = await Promise.all([
        readContract(fetchImpl, TOTAL_SUPPLY_CALLDATA),
        readContract(fetchImpl, ASSET_DATA_CALLDATA)
    ]);

    const totalSupply = decodeUint256Slot(totalSupplyHex, 0);
    const emissionPerSecond = decodeUint256Slot(assetDataHex, 0);

    if (totalSupply <= 0n || emissionPerSecond < 0n) {
        throw new Error('Invalid on-chain staking values');
    }

    const scaledPercent = (emissionPerSecond * SECONDS_PER_YEAR * 100n * PERCENT_SCALE) / totalSupply;
    return Number(scaledPercent) / Number(PERCENT_SCALE);
}

async function readContract(fetchImpl, data) {
    const response = await fetchImpl(ETHEREUM_RPC_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [
                {
                    to: STK_AAVE_CONTRACT,
                    data
                },
                'latest'
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`eth_call failed: ${response.status}`);
    }

    const payload = await response.json();
    if (payload?.error || typeof payload?.result !== 'string' || !payload.result.startsWith('0x')) {
        throw new Error('Invalid eth_call payload');
    }

    return payload.result;
}

function decodeUint256Slot(hexValue, slotIndex = 0) {
    const body = String(hexValue || '').replace(/^0x/u, '');
    const start = slotIndex * 64;
    const chunk = body.slice(start, start + 64);

    if (!chunk || chunk.length !== 64) {
        throw new Error('Invalid uint256 slot payload');
    }

    return BigInt(`0x${chunk}`);
}
