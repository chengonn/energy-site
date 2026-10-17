import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { principles as originalPrinciples } from '@/data/siteContent';
import SectionHeading from '@/components/SectionHeading';
export default function TrustSection() {
  const { t, localize } = useLanguage();
  const principles = localize(originalPrinciples);

  return (
    <section className="section" id="method">
      <SectionHeading number="02" english="BUILT ON CLARITY">
        {t('建立信任')}
      </SectionHeading>
      <div className="section-intro">
        <h2>
          {t('先看清問題，')}
          <br />
          <span>{t('再讓投入有依據。')}</span>
        </h2>
        <p>
          {t(
            '節能不從設備清單開始。從營運需求、資料與現場限制出發，讓每一項建議都能說明原因。',
          )}
        </p>
      </div>
      <div className="principle-grid">
        {principles.map(({ icon: Icon, number, title, description }) => (
          <Card key={number} className="principle-card">
            <CardContent>
              <div className="principle-top">
                <Icon size={23} />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="deliverable">
        <ArrowUpRight size={30} />
        <div>
          <h3>{t('方向清楚的評估，而非一張設備清單。')}</h3>
          <p>{t('用能問題摘要 / 候選改善方向 / 補充資料清單 / 下一步建議')}</p>
        </div>
        <Badge variant="outline">{t('初步評估交付方向')}</Badge>
      </div>
    </section>
  );
}
