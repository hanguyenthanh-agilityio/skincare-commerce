import type { ComponentType } from 'react';

// Components
import { TypographyWrapper } from '..';

interface RoutineCardProps {
  index: number;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const RoutineCard = ({ index, label, icon: Icon }: RoutineCardProps) => (
  <div className="relative flex flex-col items-center">
    <TypographyWrapper
      level="span"
      title={String(index + 1).padStart(2, '0')}
      className="absolute -top-3 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center"
    />

    <div className="w-24 h-26 rounded-lg flex flex-col items-center justify-center gap-3 bg-white pt-3">
      <Icon className="w-6 h-6" />

      <TypographyWrapper level="span" title={label} className="text-gray-500" />
    </div>
  </div>
);

export default RoutineCard;
