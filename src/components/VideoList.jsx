function VideoItem({ item }) {
  return (
    <article id={`video-${item.id}`} className="video-item">
      <div className="video-info">
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </div>
      <div className="video-actions">
        {item.links.map((link, index) => (
          <a
            href={link.href}
            target={link.newTab ? "_blank" : undefined}
            rel={link.newTab ? "noreferrer" : undefined}
            className="video-link placeholder"
            key={`${link.href}-${index}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export function VideoSection({ section }) {
  return (
    <section className="bilibili-section">
      <h2>
        {section.title}
        <span className="section-count">{section.items.length}</span>
      </h2>
      <div className="video-list">
        {section.items.map((item) => (
          <VideoItem item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
