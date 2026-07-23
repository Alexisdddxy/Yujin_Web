import { useMemo, useState } from "react";
import { LinkGrid } from "../components/LinkCard";
import { EmptyState, SearchToolbar } from "../components/SearchToolbar";
import { PageLayout } from "../components/SiteChrome";
import { siteData } from "../data/siteData";

export function MicroblogPage() {
  const [query, setQuery] = useState("");
  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase();
    if (!keyword) return siteData.microblogs;

    return siteData.microblogs.filter((item) =>
      `${item.title} ${item.description}`.toLocaleLowerCase().includes(keyword),
    );
  }, [query]);

  return (
    <PageLayout currentPage="microblog.html">
      <main className="microblog-container">
        <section className="microblog-section">
          <SearchToolbar
            value={query}
            onChange={setQuery}
            placeholder="搜索账号或内容"
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
