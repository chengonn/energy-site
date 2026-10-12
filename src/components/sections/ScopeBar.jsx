import { scenarios } from '@/data/siteContent';
export default function ScopeBar() {
  return (
    <div className="scope-bar">
      <span>為不同現場，找到合適起點</span>
      {scenarios.map((scenario) => (
        <span key={scenario.id}>
          <scenario.icon size={16} />
          {scenario.label}
        </span>
      ))}
    </div>
  );
}
