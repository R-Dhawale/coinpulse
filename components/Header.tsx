'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchModal from '@/components/SearchModal';

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (isEditable) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === '/') {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header>
        <div className="main-container inner">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Coinpulse logo"
              width={132}
              height={40}
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>

          <nav>
            <Link
              href="/"
              className={cn('nav-link', {
                active: pathname === '/',
                'is-home': true,
              })}
            >
              Home
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white/70 hover:text-white"
            >
              <Search size={16} />
              Search
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                Ctrl K
              </kbd>
            </button>

            <Link
              href="/coins"
              className={cn('nav-link', {
                active: pathname === '/coins',
              })}
            >
              All Coins
            </Link>
          </nav>
        </div>
      </header>

      <SearchModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Header;