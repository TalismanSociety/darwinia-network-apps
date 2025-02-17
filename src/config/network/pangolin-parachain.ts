import { PolkadotChainConfig } from '../../model';

export const pangolinParachainConfig: PolkadotChainConfig = {
  facade: {
    logo: '/image/network/pangolin.svg',
  },
  category: 'parachain',
  name: 'pangolin-parachain',
  provider: {
    rpc: 'wss://pangolin-parachain-rpc.darwinia.network',
  },
  ss58Prefix: 18,
  type: ['polkadot', 'darwinia'],
  tokens: {
    ring: { decimal: '18', symbol: 'PRING' },
    kton: { decimal: '18', symbol: 'PKTON' },
  },
};
