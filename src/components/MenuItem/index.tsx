import React from 'react';

// Icons
import { ChevronRight } from 'lucide-react';

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  hasArrow?: boolean;
}

const MenuItem: React.FC<Props> = ({ label, href, onClick, hasArrow = false }) => {
  return (
    <li className="border-b">
      {href ? (
        <a
          href={href}
          className="flex justify-between items-center w-full p-4 no-underline hover:underline underline-offset-2"
        >
          {label}
          {hasArrow && <ChevronRight />}
        </a>
      ) : (
        <button
          onClick={onClick}
          className="flex justify-between items-center w-full p-4 no-underline hover:underline underline-offset-2"
        >
          {label}
          {hasArrow && <ChevronRight />}
        </button>
      )}
    </li>
  );
};

export default MenuItem;
