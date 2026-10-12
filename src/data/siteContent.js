import {
  Factory,
  Building2,
  Store,
  ScanLine,
  ShieldCheck,
  ChartNoAxesCombined,
} from 'lucide-react';
export const scenarios = [
  {
    id: 'factory',
    label: '製造工廠',
    icon: Factory,
    title: '生產不中斷，改善有順序。',
    description: '從設備運轉與生產時段的關係切入，辨識空轉、設定與維護可能造成的浪費。',
    items: [
      '空壓與動力系統的運轉需求',
      '設備待機與尖峰用電時段',
      '量測點位與現場操作限制',
    ],
  },
  {
    id: 'office',
    label: '商辦大樓',
    icon: Building2,
    title: '舒適的環境，更清楚的管理。',
    description: '從空調、照明與空間需求切入，釐清設備排程與日常營運是否一致。',
    items: ['空調設定與空間使用需求', '照明分區與營運時段', '管理權責與電表資料'],
  },
  {
    id: 'retail',
    label: '零售與多據點',
    icon: Store,
    title: '據點不同，管理更有方向。',
    description:
      '理解據點的設備與營業時段差異，建立可比較的資料範圍，選出優先評估的場域。',
    items: ['營業時段與冷藏空調需求', '設備差異與資料完整度', '可複用的管理與追蹤方式'],
  },
];
export const faqs = [
  [
    '沒有完整用電資料，也能開始嗎？',
    '可以先提供場域類型與主要困擾，後續再確認電費單、設備清單或量測資料需求。',
  ],
  [
    '初步評估會保證節省多少電費嗎？',
    '不會。估算需要說明假設，實際節能成效需由量測驗證。',
  ],
  [
    '一定需要更換設備嗎？',
    '不一定。操作設定、運轉排程與維護都可能是切入點，需比較成本與營運需求。',
  ],
  [
    '費用與評估範圍如何決定？',
    '依場域、資料完整度與現勘需求而定。付費工作開始前，應先確認報價與交付範圍。',
  ],
];
export const navigation = [
  { id: 'method', label: '評估方法' },
  { id: 'solutions', label: '服務範圍' },
  { id: 'process', label: '合作流程' },
];
export const principles = [
  {
    icon: ScanLine,
    number: '01',
    title: '判斷有依據',
    description: '區分現有資料、估算與待確認項目。讓建議可追溯，避免把推測當成承諾。',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: '營運放在前面',
    description: '納入生產時段、舒適需求與停機限制。讓改善方向配合真實營運條件。',
  },
  {
    icon: ChartNoAxesCombined,
    number: '03',
    title: '成效可以驗證',
    description: '改善前定義基準、量測範圍與追蹤方式，用資料支持後續判斷。',
  },
];
export const processSteps = [
  {
    label: '提出需求',
    title: '告訴我們你的場景',
    description: '填寫基本資訊。電費資料與設備清單可後續補充。',
  },
  {
    label: '釐清條件',
    title: '確認問題與資料',
    description: '討論用能困擾、營運限制與現有資料，確認現勘或量測需求。',
  },
  {
    label: '定義下一步',
    title: '建立評估方向',
    description: '釐清改善項目、資料缺口與工作範圍，再決定是否深入評估。',
  },
];
export const contactFields = [
  {
    id: 'company',
    label: '企業名稱',
    type: 'text',
    placeholder: '例如：○○製造有限公司',
    autoComplete: 'organization',
    maxLength: 100,
  },
  {
    id: 'name',
    label: '聯絡人姓名',
    type: 'text',
    placeholder: '你的姓名',
    autoComplete: 'name',
    maxLength: 100,
  },
  {
    id: 'email',
    label: '聯絡 Email',
    type: 'email',
    placeholder: 'name@company.com',
    autoComplete: 'email',
    maxLength: 254,
  },
];
export const facilityTypes = ['製造工廠', '商辦大樓', '零售與多據點', '其他場域'];
export const assessmentBenefits = [
  '四個必要欄位，先建立聯絡',
  '不用先準備完整設備資料',
  '後續再確認範圍與費用',
];
