import type { ComponentType } from 'react';

// Components
import { RoutineCard, TypographyWrapper } from '@/components';
import { Icons } from '@/ui';

export interface RoutineStep {
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

interface RoutineListProps {
  title: string;
  subTitle: string;
  steps: RoutineStep[];
}

const RoutineList = ({ title, subTitle, steps }: RoutineListProps) => (
  <section
    aria-labelledby="routine-title"
    className="flex flex-col items-center justify-center bg-destructive/50 py-20 px-5 text-center"
  >
    <TypographyWrapper level="span" title={subTitle} className="mb-2 text-xs" />

    <TypographyWrapper level="p" title={title} className="text-xl font-medium" />

    {/* Steps */}
    <ul className="mt-10 flex items-center gap-3 md:gap-6">
      {steps.map(({ label, Icon }, index) => (
        <li key={label} className="flex items-center gap-3 md:gap-6">
          <RoutineCard index={index + 1} label={label} icon={Icon} />

          {/* Plus separator */}
          {index < steps.length - 1 && <Icons.Plus aria-hidden className="size-3 text-gray-400" />}
        </li>
      ))}
    </ul>
  </section>
);

export default RoutineList;
