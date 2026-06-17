'use client';

import DataTable from '@/components/DataTable';
import React from 'react';

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview">
      <div className="header pt-2 gap-3 flex items-center">
        <div className="h-14 w-14 bg-dark-400 rounded-full animate-pulse" />
        <div className="info flex-1">
          <div className="h-4 w-32 bg-dark-400 rounded mb-2 animate-pulse" />
          <div className="h-8 w-48 bg-dark-400 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const skeletonColumns: DataTableColumn<any>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-dark-400 rounded animate-pulse" />
          <div className="h-4 w-24 bg-dark-400 rounded animate-pulse" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'name-cell',
      cell: () => <div className="h-4 w-16 bg-dark-400 rounded animate-pulse" />,
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <div className="h-4 w-20 bg-dark-400 rounded animate-pulse" />,
    },
  ];

  const skeletonData = Array(6)
    .fill(null)
    .map((_, i) => ({ id: `skeleton-${i}` }));

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div id="trending-coins">
        <DataTable
          data={skeletonData}
          columns={skeletonColumns}
          rowKey={(item, idx) => `${item.id}-${idx}`}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export const CategoriesFallback = () => {
  const skeletonColumns: DataTableColumn<any>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: () => <div className="h-4 w-24 bg-dark-400 rounded animate-pulse" />,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: () => (
        <div className="flex gap-2">
          <div className="h-7 w-7 bg-dark-400 rounded animate-pulse" />
          <div className="h-7 w-7 bg-dark-400 rounded animate-pulse" />
          <div className="h-7 w-7 bg-dark-400 rounded animate-pulse" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-header-cell',
      cell: () => <div className="h-4 w-12 bg-dark-400 rounded animate-pulse" />,
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: () => <div className="h-4 w-20 bg-dark-400 rounded animate-pulse" />,
    },
    {
      header: '24h Volume',
      cellClassName: 'volume-cell',
      cell: () => <div className="h-4 w-20 bg-dark-400 rounded animate-pulse" />,
    },
  ];

  const skeletonData = Array(10)
    .fill(null)
    .map((_, i) => ({ id: `skeleton-${i}` }));

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={skeletonColumns}
        data={skeletonData}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  );
};
