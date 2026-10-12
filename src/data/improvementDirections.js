import { CalendarClock, SlidersHorizontal, Wrench } from 'lucide-react';

export const improvementDirections = [
  {
    icon: CalendarClock,
    label: '運轉排程',
    title: '在需要的時候，才啟動。',
    description: '檢視設備使用時段與營運需求，辨識待機與空轉的評估方向。',
    visual: 'schedule',
  },
  {
    icon: SlidersHorizontal,
    label: '操作設定',
    title: '把設定，調回現場需求。',
    description: '確認設定值與實際負載是否一致，釐清改善前需要驗證的條件。',
    visual: 'settings',
  },
  {
    icon: Wrench,
    label: '維護與量測',
    title: '看見平常看不見的損耗。',
    description: '從設備狀態與量測資料切入，討論維護、追蹤與後續診斷。',
    visual: 'maintenance',
  },
];
