import Link from "next/link";
import { ArrowRight } from "./icons";
import TourCard from "./TourCard";
import { featuredTours } from "@/data/tours";

export default function ToursSection() {
  return (
    <section className="section tours-section" aria-labelledby="tours-heading">
      <div className="container">
        <div className="tours-header">
          <div className="tours-header-left reveal">
            <p className="section-eyebrow">Our journeys</p>
            <h2 className="section-title" id="tours-heading">
              Journeys
              <br />
              we <em>design.</em>
            </h2>
          </div>
          <Link href="/tours" className="tours-view-all reveal reveal-delay-2">
            All journeys
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="tours-grid">
          {featuredTours.map((tour, i) => (
            <TourCard key={tour.slug} tour={tour} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
