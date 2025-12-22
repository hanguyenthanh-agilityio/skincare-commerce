// UIs
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/ui';

// Components
import { LinkWrapper } from '@/components';

// Types
import type { FaqSection } from '@/types';

interface Props {
  sections: FaqSection[];
}

export default function FaqAccordion({ sections }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="py-6 text-left text-lg font-normal hover:no-underline [&[data-state=open]>svg:rotate-180">
            {section.title}
          </AccordionTrigger>

          <AccordionContent>
            <ul className="list-disc pl-5 space-y-3">
              {section.items.map((item) => (
                <li key={item.id} className="mb-5">
                  <LinkWrapper
                    href="#"
                    className="underline underline-offset-4 text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </LinkWrapper>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
