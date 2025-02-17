import { Button, Card, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { StakingRecords } from '../components/account/StakingRecords';
import { AssetOverview } from '../components/account/AssetOverview';
import { useAccount, useApi } from '../hooks';
import { CustomTab } from '../components/widget/CustomTab';
import { PolkadotTypeNetwork } from '../model';

type TypeTabKeys = 'asset' | 'cross';

export function Account() {
  const { t } = useTranslation();
  const { network } = useApi();
  const { assets, assetsLoading, refreshAssets } = useAccount();
  const [activeKey, setActiveKey] = useState<TypeTabKeys>('asset');

  const crossChainPrompt: Record<PolkadotTypeNetwork, string> = {
    crab: t('You can transfer CRAB/CKTON through the bridge between Crab Chain and Crab Smart Chain.'),
    darwinia: t('You can transfer RING/KTON through the cross-chain bridge between Ethereum and Darwinia.'),
    pangolin: t('You can transfer PRING/PKTON through the cross-chain bridge between Pangolin and Ropsten.'),
    pangoro: t('You can transfer ORING through the cross-chain bridge between Pangoro and Pangolin Smart Chain.'),
    'crab-parachain': '',
    'pangolin-parachain': '',
  };

  return (
    <Tabs
      onChange={(key) => setActiveKey(key as TypeTabKeys)}
      className={`lg:px-8 px-4 w-full mx-auto dark:shadow-none dark:border-transparent pb-5 page-account-tabs page-account-tabs-${network.name}`}
    >
      <Tabs.TabPane key="asset" tab={<CustomTab text={t('Darwinia Asset')} tabKey="asset" activeKey={activeKey} />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {assets.map((item, index) => (
            <AssetOverview asset={item} key={index} refresh={refreshAssets} loading={assetsLoading}></AssetOverview>
          ))}
        </div>

        <StakingRecords />
      </Tabs.TabPane>

      {crossChainPrompt[network.name as PolkadotTypeNetwork] && (
        <Tabs.TabPane key="cross" tab={<CustomTab text={t('Cross Chain')} tabKey="cross" activeKey={activeKey} />}>
          <Card className="shadow-xxl">
            <p className="mb-4 opacity-60">{crossChainPrompt[network.name as PolkadotTypeNetwork]}</p>
            <Button
              type="primary"
              onClick={() => {
                window.open('https://helixbridge.app/', '_blank');
              }}
            >
              {t('Go to Helix')}
            </Button>
          </Card>
        </Tabs.TabPane>
      )}
    </Tabs>
  );
}
