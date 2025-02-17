import { gql } from '@apollo/client';

export const FEE_MARKET_OVERVIEW = gql`
  query feeMarketOverview($destination: String!) {
    market(id: $destination) {
      averageSpeed
      totalReward
      totalOrders
    }
  }
`;

export const TOTAL_ORDERS_OVERVIEW = gql`
  query totalOrdersOverview($destination: String!) {
    orders(filter: { id: { startsWith: $destination } }, orderBy: CREATE_BLOCK_TIME_ASC) {
      nodes {
        createBlockTime
      }
    }
  }
`;

export const RELAYER_OVERVIEW = gql`
  query relayerOverview($relayerId: String!) {
    relayer(id: $relayerId) {
      totalOrders
      totalSlashes
      totalRewards
    }
  }
`;

export const ORDERS_STATISTICS = gql`
  query ordersStatistics($destination: String!) {
    market(id: $destination) {
      finishedOrders
      unfinishedInSlotOrders
      unfinishedOutOfSlotOrders
    }
  }
`;

export const ORDERS_OVERVIEW = gql`
  query ordersOverview($destination: String!) {
    orders(filter: { id: { startsWith: $destination } }, orderBy: CREATE_EVENT_INDEX_DESC) {
      nodes {
        lane
        nonce
        sender
        deliveryRelayers {
          nodes {
            deliveryRelayer {
              address
            }
          }
        }
        confirmationRelayers {
          nodes {
            confirmationRelayer {
              address
            }
          }
        }
        createBlockNumber
        finishBlockNumber
        createBlockTime
        finishBlockTime
        status
        slotIndex
      }
    }
  }
`;

export const ORDER_DETAIL = gql`
  query orderDetail($orderId: String!) {
    order(id: $orderId) {
      lane
      nonce
      fee
      sender
      sourceTxHash
      slotTime
      outOfSlotBlock
      slotIndex
      status
      createBlockTime
      finishBlockTime
      createBlockNumber
      finishBlockNumber
      assignedRelayersAddress
      slashes {
        nodes {
          amount
          relayer {
            address
          }
          relayerRole
          blockNumber
          extrinsicIndex
        }
      }
      rewards {
        nodes {
          amount
          relayer {
            address
          }
          relayerRole
          blockNumber
          extrinsicIndex
        }
      }
      treasuryAmount
    }
  }
`;

export const RELAYER_REWARD_SLASH = gql`
  query relayerRewardSlash($relayerId: String!) {
    relayer(id: $relayerId) {
      slashes {
        nodes {
          amount
          blockTime
        }
      }
      rewards {
        nodes {
          amount
          blockTime
        }
      }
    }
  }
`;

export const QUOTE_HISTORY = gql`
  query quoteHistory($relayerId: String!) {
    quoteHistory(id: $relayerId) {
      data
    }
  }
`;

export const RELAYER_ORDERS = gql`
  query relayerOrders($relayerId: String!) {
    relayer(id: $relayerId) {
      slashes {
        nodes {
          order {
            lane
            nonce
            createBlockTime
          }
          amount
          relayerRole
        }
      }
      rewards {
        nodes {
          order {
            lane
            nonce
            createBlockTime
          }
          amount
          relayerRole
        }
      }
    }
  }
`;

export const FEE_HISTORY = gql`
  query feeHistory($destination: String!) {
    feeHistory(id: $destination) {
      data
    }
  }
`;
