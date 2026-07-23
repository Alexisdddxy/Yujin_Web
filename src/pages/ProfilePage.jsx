import { PageLayout } from "../components/SiteChrome";
import { siteData } from "../data/siteData";

export function ProfilePage() {
  const { profile } = siteData;

  return (
    <PageLayout currentPage="basic-info.html">
      <main className="info-container">
        <section className="info-section">
          <h2>{profile.sectionTitle}</h2>
          <div className="info-grid">
            {profile.groups.map((group) => (
              <article className="info-item" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.rows.map((row, index) => (
                    <li key={`${group.title}-${index}`}>
                      {row.label && <strong>{row.label}</strong>}
                      {row.value}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2>{profile.timelineTitle}</h2>
          <div className="timeline">
            {profile.timeline.map((item) => (
              <article className="timeline-item" key={item.date}>
                <div className="timeline-date">{item.date}</div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
