/** FAQs. Drives the visible FAQ section AND the FAQPage structured data,
 *  so the schema always matches what visitors actually see. */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "What does Sillage Égypte offer?",
    answer:
      "Sillage Égypte offers fully private tours across Egypt — including Nile journeys, desert and oasis expeditions, and ancient site immersion programmes in Cairo and Luxor. Every tour is designed exclusively for you, with no shared groups.",
  },
  {
    question: "Who are Sillage Égypte tours designed for?",
    answer:
      "Our tours are designed for international travellers — primarily from Europe, North America, and Japan — who want depth, expert knowledge, and total privacy. Travellers who have done the standard tours and now want something that goes further.",
  },
  {
    question: "Are all Sillage Égypte tours private?",
    answer:
      "Yes. All Sillage Égypte journeys are private by design. We do not operate shared group departures. Your guide, your pace, your interests — entirely.",
  },
  {
    question: "How do I book a Sillage Égypte tour?",
    answer:
      "Every journey begins with a conversation. Use the Plan Your Journey form to tell us what you're looking for — preferred dates, interests, group size — and one of our journey designers will be in touch within 24 hours to start the design process.",
  },
  {
    question: "What destinations does Sillage Égypte cover?",
    answer:
      "We design journeys across all major Egyptian destinations: the Nile from Aswan to Cairo, the Valley of the Kings and Luxor temples, the White Desert and Siwa Oasis, Islamic Cairo, and private access to sites not on standard itineraries.",
  },
  {
    question: "How much does a private Egypt tour cost?",
    answer:
      "Because every journey is designed individually, pricing reflects its length, the standard of hotels, and the experiences included. We share a clear proposal after an initial conversation, with no obligation. Sillage Égypte sits in the luxury tier of private travel.",
  },
];
