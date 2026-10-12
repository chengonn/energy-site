import { Check, ShieldCheck } from 'lucide-react';
import AssessmentForm from '@/components/AssessmentForm';
import { assessmentBenefits } from '@/data/siteContent';
import SectionHeading from '@/components/SectionHeading';
export default function AssessmentSection() {
  return (
    <section className="section assessment" id="assessment">
      <div>
        <SectionHeading number="04" english="LET’S BEGIN">
          採取行動
        </SectionHeading>
        <h2>
          下一度電，
          <br />
          用得<span>更值得。</span>
        </h2>
        <p className="assessment-description">
          從一次需求對話開始，
          <br />
          讓企業節能有更清楚的方向。
        </p>
        <ul className="assessment-benefits">
          {assessmentBenefits.map((x) => (
            <li key={x}>
              <Check size={15} />
              {x}
            </li>
          ))}
        </ul>
        <div className="demo-notice">
          <ShieldCheck size={19} />
          <p>
            概念網站示範
            <br />
            <span>目前未串接服務團隊，內容不會傳送或保存。</span>
          </p>
        </div>
      </div>
      <AssessmentForm />
    </section>
  );
}
