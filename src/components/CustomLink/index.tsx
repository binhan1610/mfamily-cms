import Link from 'next/link';
import React from 'react';

interface ICustomLink {
  children: React.ReactNode | string;
  href: string;
  className?: string;
  as?: string;
}

const CustomLink = ({ children, href, as }: ICustomLink) => {
  return (
    <Link href={href} as={as}>
      {children}
    </Link>
  );
};

CustomLink.displayName = 'CustomLink';

export default CustomLink;
