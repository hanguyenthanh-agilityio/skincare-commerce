import type { ComponentType } from 'react';

// Components
import { RoutineCard, TypographyWrapper } from '@/components';
import { Icons } from '@/ui';

interface RoutineListProps {
  title: string;
  subTitle: string;
  steps: {
    label: string;
    icon: ComponentType<{ className?: string }>;
  }[];
}

const RoutineList = ({ title, subTitle, steps }: RoutineListProps) => (
  <div className="flex flex-col items-center justify-center bg-destructive py-20 px-5">
    <TypographyWrapper level="span" title={subTitle} className="text-xs mb-2" />

    <TypographyWrapper level="p" title={title} className="text-xl font-medium" />

    <div className="flex items-center gap-3 md:gap-6 mt-10">
      {steps?.map(({ label, icon: Icon }, index) => (
        <>
          <RoutineCard index={index} label={label} icon={Icon} />

          {/* Plus */}
          {index < steps.length - 1 && <Icons.Plus color="gray" className="size-3" />}
        </>
      ))}
    </div>
  </div>
);

export default RoutineList;
