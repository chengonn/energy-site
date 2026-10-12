// 預覽用事件只保留於記憶體；重新整理後清除，不收集表單內容。
export const analytics = {
  events: [],
  track(event, properties = {}) {
    const record = { event, ...properties, time: new Date().toISOString() };
    this.events.push(record);
    window.dispatchEvent(new CustomEvent('energy:analytics', { detail: record }));
  },
  summary() {
    return this.events.reduce((r, e) => ({ ...r, [e.event]: (r[e.event] || 0) + 1 }), {});
  },
};
if (typeof window !== 'undefined') window.energyAnalytics = analytics;
