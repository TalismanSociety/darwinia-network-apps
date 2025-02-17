import { Alert, Card, Tabs, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useMemo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../hooks';
import { readStorage, updateStorage } from '../utils';

type PortalData = {
  name: string;
  logo: string;
  description: string;
  link: string;
};

const PortalCard = ({
  children,
  className,
  onClick,
}: PropsWithChildren<{ className?: string; onClick?: () => void }>) => (
  <Card
    bordered={false}
    hoverable
    style={{ minHeight: 250 }}
    className={`shadow-xxl transition-transform duration-300 transform hover:scale-105 ${className}`}
    onClick={onClick}
  >
    {children}
  </Card>
);

export function Portal() {
  const { t } = useTranslation();
  const { network } = useApi();
  const hidePortalWarning = !!readStorage().hidePortalWarning;

  const portalData = useMemo<PortalData[]>(
    () => [
      {
        name: 'Account Migration',
        logo: '/image/portal/account-migration.svg',
        description: t('A tool to migrate your Darwinia 1.0 account to Darwinia 2.0.'),
        link: 'https://migration.darwinia.network/',
      },
      {
        name: 'Staking Dapp',
        logo: '/image/portal/staking.svg',
        description: t('The easiest way to stake on Darwinia.'),
        link: 'https://staking.darwinia.network/',
      },
      {
        name: 'Token Migration',
        logo: '/image/portal/token-migration.svg',
        description: t('A tool to migrate your Darwinia Tokens to the new contract.'),
        link: 'https://token-migration.darwinia.network/',
      },
      {
        name: 'Fee Market UI',
        logo: '/image/portal/fee-market-ui.svg',
        description: t('To Provide data statistics and relayer operation functions for the Darwinia Fee Market.'),
        link: 'https://feemarket.darwinia.network/',
      },
      {
        name: 'Subscan',
        logo: '/image/portal/subscan.png',
        description: t('Subscan is aggregate Substrate ecological network High-precision Web3 explorer.'),
        link: 'https://www.subscan.io/',
      },
      {
        name: 'Subview',
        logo: '/image/portal/subview.png',
        description: t('A block explorer and analytics platform for Crab Smart Chain.'),
        link: 'https://subview.xyz/',
      },
      {
        name: 'SnowSwap',
        logo: '/image/portal/snowswap.png',
        description: t('Trade and earn without registration.'),
        link: 'https://snowswap.xyz/#/',
      },
      {
        name: 'Helix',
        logo: '/image/portal/helix.png',
        description: t('A safe community tool for cross-chain assets.'),
        link: 'https://helixbridge.app/',
      },
      {
        name: 'Celer',
        logo: '/image/portal/celer.png',
        description: t('Building the best inter-blockchain and cross-layer communication platform.'),
        link: 'https://cbridge.celer.network/#/transfer',
      },
      {
        name: 'OnFinality',
        logo: '/image/portal/onfinality.png',
        description: t('OnFinality is a leading infrastructure service for some of the largest blockchain projects.'),
        link: 'https://onfinality.io/',
      },
      {
        name: 'Crust',
        logo: '/image/portal/crust.png',
        description: t('Web3.0 Storage for the Metaverse.'),
        link: 'https://crust.network/',
      },
      {
        name: 'Evolution Land',
        logo: '/image/portal/evolution-land.png',
        description: t('Evolution Land is the first Metaverse+Gamefi+cross-chain game.'),
        link: 'https://www.evolution.land/',
      },
      {
        name: 'Talisman',
        logo: '/image/portal/talisman.svg',
        description: t('One wallet for Polkadot & Ethereum.'),
        link: `https://talisman.xyz`,
      },
      {
        name: 'MetaMask',
        logo: '/image/portal/metamask.png',
        description: t('A crypto wallet & gateway to blockchain apps.'),
        link: 'https://metamask.io/',
      },
      {
        name: 'polkadot{.js}',
        logo: '/image/portal/polkadot.svg',
        description: t(
          'A wallet built on the polkadot-js stack. This version is updated alongside any changes to the code and always has the latest features.'
        ),
        link: `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(network.provider.rpc)}`,
      },
      {
        name: 'MathWallet',
        logo: '/image/portal/mathwallet.png',
        description: t(`World's First Insured Crypto Wallet.`),
        link: 'https://www.mathwallet.org/en-us/',
      },
      {
        name: 'SubWallet',
        logo: '/image/portal/subwallet.png',
        description: t(
          'SubWallet is a pioneering user-friendly Web3 Multiverse Gateway for the Polkadot and Kusama ecosystems.'
        ),
        link: 'https://subwallet.app/',
      },
      {
        name: 'RARE 💎 GEMS',
        logo: '/image/portal/raregems.svg',
        description: t('Non-custodial NFT marketplace, connected to Crab network.'),
        link: 'https://raregems.io/',
      },
      {
        name: 'Ringo NFT',
        logo: '/image/portal/ringonft.png',
        description: t('NFT Avatar Collection on Crab Network'),
        link: 'https://ringonft.art',
      },
      {
        name: 'Multisig',
        logo: '/image/portal/ipfs.png',
        description: t('A tool to create multisig account.'),
        link: 'https://ipfs.io/ipfs/QmfRD4GuqZobNi2NT2C77a3UTQ452ffwstr4fjEJixUgjf/#/wallets',
      },
    ],
    [t, network]
  );

  return (
    <div className="lg:px-8 px-4">
      {!hidePortalWarning && (
        <Alert
          message={t(
            'The links in the Darwinia Portal are provided as a convenience and for informational purposes only; Darwinia Apps bears no responsibility for the accuracy, legality, security or content of the external sites linked or for that of subsequent links. For any questions or comments surrounding any of the projects listed, please contact corresponding projects directly.'
          )}
          type="warning"
          closable
          closeText={
            <Tooltip title={t(`I've known it, never show this again`)}>
              <CloseOutlined />
            </Tooltip>
          }
          onClose={() => {
            updateStorage({ hidePortalWarning: true });
          }}
          className="m-0 flex flex-col space-y-2 lg:flex-row lg:space-y-0"
        />
      )}

      <Tabs
        accessKey="overview"
        className={`px-0 w-full mx-auto dark:shadow-none dark:border-transparent pb-5 page-account-tabs page-account-tabs-${network.name}`}
      >
        <Tabs.TabPane tab={t('overview')} key="overview">
          <div className="mt-2 grid grid-cols-1 gap-x-0 gap-y-5 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8 xl:grid-cols-5">
            {portalData.map(({ name, logo, description, link }, index) => (
              <PortalCard key={index} onClick={() => window.open(link, '_blank', 'noopener noreferrer')}>
                <div className="flex flex-col gap-4 items-center">
                  <img src={logo} style={{ height: 70, borderRadius: '50%' }} />
                  <b className="fond-bold text-lg text-center">{name}</b>
                  <p>{description}</p>
                </div>
              </PortalCard>
            ))}
            <PortalCard
              className="flex items-center justify-center"
              onClick={() => window.open(t('Github link for add portal'), '_blank', 'noopener noreferrer')}
            >
              <Tooltip title={t('Submit a project')} placement="bottom">
                <img src={'/image/portal/add.svg'} style={{ height: 70 }} />
              </Tooltip>
            </PortalCard>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
