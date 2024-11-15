'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ServerSelector({ initialServer }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleServerChange = (value) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('server', value);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };

  return (
    <motion.div
      className='my-2 flex items-center space-x-2 rounded-lg border border-border bg-card p-4 shadow-lg'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Server className='h-5 w-5 text-primary' />
      <Select id='server-select' defaultValue={initialServer} onValueChange={handleServerChange}>
        <SelectTrigger className='w-[200px] border-input bg-input text-foreground focus:ring-ring'>
          <SelectValue placeholder='Select Server' />
        </SelectTrigger>
        <SelectContent className='my-2 w-[200px] border-border bg-popover'>
          <SelectGroup>
            <SelectLabel className='text-muted-foreground'>Available Servers</SelectLabel>
            {['asianload', 'streamtape', 'mixdrop', 'streamsb'].map((server) => (
              <SelectItem
                key={server}
                value={server}
                className='cursor-pointer py-2 text-popover-foreground focus:bg-accent focus:text-accent-foreground'
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-full'
                >
                  {server.charAt(0).toUpperCase() + server.slice(1)}
                </motion.div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </motion.div>
  );
}
