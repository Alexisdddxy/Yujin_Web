export function LinkCard({ item }) {
  return (
    <article className="link-card">
      <h3>
        {item.icon.length > 0 && (
          <i className={item.icon.join(" ")} aria-hidden="true" />
        )}
        <span>{item.title}</span>
      </h3>
      <p>{item.description}</p>
      <a
        href={item.href}
        target={item.newTab ? "_blank" : undefined}
        rel={item.newTab ? "noreferrer" : undefined}
        className="placeholder"
      >
        {item.linkLabel}
      </a>
    </article>
  );
}

export function LinkGrid({ items }) {
  return (
    <div className="link-grid">
      {items.map((item, index) => (
        <LinkCard item={item} key={`${item.href}-${item.title}-${index}`} />
      ))}
    </div>
  );
}
