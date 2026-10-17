import { useLanguage } from '@/i18n/LanguageContext';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { faqs as originalFaqs } from '@/data/siteContent';
import SectionHeading from '@/components/SectionHeading';
export default function FaqSection() {
  const { t, localize } = useLanguage();
  const faqs = localize(originalFaqs);

  return (
    <section className="section faq-section" id="questions">
      <div>
        <SectionHeading number="?" english="FAQ">
          {t('常見問題')}
        </SectionHeading>
        <h2>
          {t('開始之前，')}
          <br />
          <span>{t('你可能想知道。')}</span>
        </h2>
      </div>
      <Accordion type="single" collapsible>
        {faqs.map(([q, a], i) => (
          <AccordionItem value={'faq-' + i} key={q}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
