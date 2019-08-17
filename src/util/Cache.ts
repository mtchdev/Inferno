import NodeCache from 'node-cache';

export const Cache = new NodeCache({stdTTL: 100, checkperiod: 120});
