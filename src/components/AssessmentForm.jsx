import { useLanguage } from '@/i18n/LanguageContext';
import { useState, useRef } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { analytics } from '@/lib/analytics';
import {
  contactFields as originalContactFields,
  facilityTypes as originalFacilityTypes,
} from '@/data/siteContent';
export default function AssessmentForm() {
  const { t, localize } = useLanguage();
  const contactFields = localize(originalContactFields);
  const facilityTypes = localize(originalFacilityTypes);

  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  function recordFormStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    analytics.track('form_start');
  }

  function handleValidationError(event) {
    // 只記錄欄位名稱，不記錄使用者填寫的內容。
    analytics.track('form_validation_error', { field: event.target.name });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isComplete) return;
    recordFormStart();
    // 示範完成不等於後端已接收申請。
    analytics.track('form_demo_complete');
    setIsComplete(true);
    event.currentTarget.reset();
  }

  return (
    <form
      className="assessment-form"
      onInput={recordFormStart}
      onInvalid={handleValidationError}
      onSubmit={handleSubmit}
    >
      <div className="form-heading">
        <h3>{t('申請初步評估')}</h3>
        <Badge variant="outline">{t('需求登記')}</Badge>
      </div>
      <p className="form-intro">{t('填寫基本資訊，開始釐清改善方向。')}</p>
      {contactFields.map(({ id, label, type, placeholder, autoComplete, maxLength }) => (
        <div className="field" key={id}>
          <Label htmlFor={id}>
            {label}
            <span>{t('必填')}</span>
          </Label>
          <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required
            maxLength={maxLength}
            disabled={isComplete}
          />
        </div>
      ))}
      <div className="field">
        <Label htmlFor="site-type">
          {t('場域類型')}
          <span>{t('必填')}</span>
        </Label>
        <select
          id="site-type"
          name="site_type"
          required
          disabled={isComplete}
          defaultValue=""
        >
          <option value="" disabled>
            {t('選擇你的企業場域')}
          </option>
          {facilityTypes.map((x, index) => (
            <option key={index} value={`facility-${index}`}>
              {x}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <Label htmlFor="need">
          {t('想改善的問題')}
          <span>{t('選填')}</span>
        </Label>
        <Textarea
          id="need"
          name="need"
          maxLength={600}
          disabled={isComplete}
          placeholder={t('例如：希望了解空調用電的改善空間')}
        />
      </div>
      <p className="form-privacy">
        {t('示範表單：資料不會傳送或保存。正式服務需另行確認評估範圍與費用。')}
      </p>
      <Button type="submit" className="form-submit" disabled={isComplete}>
        {isComplete ? t('已完成示範') : t('試填完成，查看下一步')}
        {isComplete ? <Check size={16} /> : <ArrowUpRight size={16} />}
      </Button>
      <p className="form-status" role="status">
        {isComplete
          ? t('試填完成！下一步是確認場域需求與評估範圍。這是示範操作，資料未送出。')
          : ''}
      </p>
    </form>
  );
}
