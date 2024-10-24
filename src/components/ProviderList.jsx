"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProviderList = ({ name, description, imgSrc, slug }) => {
  const pathname = usePathname();
  const href = `${pathname}${slug}`;

  return (
    <Link href={href} className="p-4">
      <motion.div
        className="border-b hover:scale-105 active:scale-90 duration-200 gap-4 mx-auto py-8 px-4 sm:px-6 lg:px-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <Image
              unoptimized
              alt={name}
              className="h-24 w-24 rounded-full object-contain"
              height="100"
              width="100"
              src={imgSrc}
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-lg w-full hidden sm:block">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProviderList;