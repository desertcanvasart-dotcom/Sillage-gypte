import { faqs } from "@/data/faq";

/**
 * Visible FAQ section. Renders the same questions/answers that the FAQPage
 * structured data exposes (see lib/structured-data.ts), so schema and content
 * always match. Native <details> keeps it crawlable and JS-free.
 */
export default function FaqSection() {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="center-col reveal">
          <p className="section-eyebrow">Questions</p>
          <h2 className="section-title" id="faq-heading">
            Good to <em>know.</em>
          </h2>
        </div>
        <div className="faq-list reveal reveal-delay-1">
          {faqs.map((f, i) => (
            <details className="faq-item" key={f.question} open={i === 0}>
              <summary>
                <span className="faq-q">{f.question}</span>
                <span className="itin-toggle" aria-hidden="true" />
              </summary>
              <div className="faq-a">{f.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
