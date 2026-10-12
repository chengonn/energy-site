export default function SectionHeading({ number, children, english }) {
  return (
    <div className="section-heading">
      <span>
        {number} / {children}
      </span>
      <span>{english}</span>
    </div>
  );
}
