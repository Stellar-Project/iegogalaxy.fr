import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WikiAccordionProps {
  items: { title: string; content: string }[];
}

export function WikiAccordion({ items }: WikiAccordionProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent className="text-gray-200">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
