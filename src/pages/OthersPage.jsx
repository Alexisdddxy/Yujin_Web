import { useMemo, useState } from "react";
import { LinkGrid } from "../components/LinkCard";
import { EmptyState, SearchToolbar } from "../components/SearchToolbar";
import { PageLayout } from "../components/SiteChrome";
import { siteData } from "../data/siteData";

export function OthersPage() {
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase();
    if (!keyword) return siteData.socialLinks;

    return siteData.socialLinks.filter((item) =>
      `${item.title} ${item.description}`.toLocaleLowerCase().includes(keyword),
    );
  }, [query]);

  return (
    <PageLayout currentPage="others.html">
      <main className="others-container">
        <section className="others-section">
          <h2>{siteData.socialTitle}</h2>
          <SearchToolbar
            value={query}
            onChange={setQuery}
            placeholder="搜索社交平台"
            resultCount={filteredItems.length}
          />
          {filteredItems.length > 0 ? (
            <LinkGrid items={filteredItems} />
          ) : (
            <EmptyState />
          )}
        </section>
      </main>
    </PageLayout>
  );
}
