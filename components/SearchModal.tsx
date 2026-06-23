'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchCoins = async () => {
      if (!query.trim()) {
        setCoins([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${query}`
        );

        const data = await response.json();

        setCoins(data.coins || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(searchCoins, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#121212]"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a token by name or symbol..."
          className="w-full border-b border-white/10 bg-transparent p-5 text-lg outline-none"
        />

        <div className="max-h-[450px] overflow-y-auto">
          {loading && (
            <div className="p-4 text-gray-400">
              Searching...
            </div>
          )}

          {!loading &&
            coins.map((coin) => (
              <Link
                key={coin.id}
                href={`/coins/${coin.id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-4 hover:bg-white/5 transition"
              >
                <Image
                  src={coin.thumb}
                  alt={coin.name}
                  width={40}
                  height={40}
                />

                <div className="flex-1">
                  <h4 className="font-medium">
                    {coin.name}
                  </h4>

                  <p className="text-sm text-gray-400 uppercase">
                    {coin.symbol}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}