import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/ui';
import LinkWrapper from '../LinkWrapper';

import type { FaqSection } from '@/types';

interface Props {
  sections: FaqSection[];
}

export default function FaqAccordion({ sections }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id} className="border-b border-border/40">
          <AccordionTrigger
            className="
                py-6
                text-left
                text-lg
                font-normal
                hover:no-underline
                [&[data-state=open]>svg]:rotate-180
              "
          >
            {section.title}
          </AccordionTrigger>

          <AccordionContent>
            <ul className="list-disc pl-5 space-y-3 pb-6">
              {section.items.map((item) => (
                <li key={item.id}>
                  <LinkWrapper
                    href="#"
                    className="
                        text-sm
                        underline
                        underline-offset-4
                        text-muted-foreground
                        hover:text-foreground
                      "
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
