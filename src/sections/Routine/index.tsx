import type { ComponentType } from 'react';
import type { RoutineStepKey } from '@/types';

// Components
import { RoutineCard, TypographyWrapper } from '@/components';
import { Icons } from '@/ui';

interface RoutineListProps {
  title: string;
  subTitle: string;
  steps: Record<RoutineStepKey, string>;
}

const STEP_ICONS: Record<RoutineStepKey, ComponentType<{ className?: string }>> = {
  cleansing: Icons.Bottle,
  tone: Icons.Soap,
  cream: Icons.Cream,
};

/* Order is UI decision */
const STEP_ORDER: RoutineStepKey[] = ['cleansing', 'tone', 'cream'];

const RoutineList = ({ title, subTitle, steps }: RoutineListProps) => (
  <section
    aria-labelledby="routine-title"
    className="flex flex-col items-center justify-center bg-destructive/50 py-20 px-5 text-center"
  >
    <TypographyWrapper level="span" title={subTitle} className="mb-2 text-xs" />

    <TypographyWrapper level="p" title={title} className="text-xl font-medium" />

    {/* Steps */}
    <ul className="mt-10 flex items-center gap-3 md:gap-6">
      {STEP_ORDER.map((key, index) => (
        <li key={key} className="flex items-center gap-3 md:gap-6">
          <RoutineCard index={index} label={steps[key]} icon={STEP_ICONS[key]} />

          {index < STEP_ORDER.length - 1 && (
            <Icons.Plus aria-hidden className="size-3 text-gray-400" />
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default RoutineList;
