import { useMemo, useState } from "react";
import { EmptyState, SearchToolbar } from "../components/SearchToolbar";
import { PageLayout } from "../components/SiteChrome";
import { VideoSection } from "../components/VideoList";
import { siteData } from "../data/siteData";

const videoSections = siteData.videoSections.map((section) => ({
  ...section,
  items: section.items.map((item, index) => ({
    ...item,
    id: `${section.title}-${index}`,
  })),
}));

export function VideosPage() {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("全部");

  const filteredSections = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase();

    return videoSections
      .filter(
        (section) =>
          activeSection === "全部" || section.title === activeSection,
      )
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          `${item.title} ${item.description}`
            .toLocaleLowerCase()
            .includes(keyword),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [activeSection, query]);

  const resultCount = filteredSections.reduce(
    (count, section) => count + section.items.length,
    0,
  );

  const showRandomVideo = () => {
    const visibleItems = filteredSections.flatMap((section) => section.items);
    if (visibleItems.length === 0) return;

    const randomItem =
      visibleItems[Math.floor(Math.random() * visibleItems.length)];
    const element = document.getElementById(`video-${randomItem.id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    element?.classList.add("is-picked");
    window.setTimeout(() => element?.classList.remove("is-picked"), 1300);
  };

  return (
    <PageLayout currentPage="bilibili.html">
      <main className="bilibili-container">
        <SearchToolbar
          value={query}
          onChange={setQuery}
          placeholder="搜索视频标题或描述"
          resultCount={resultCount}
        >
          <div className="filter-pills" aria-label="视频分类">
            {["全部", ...videoSections.map((section) => section.title)].map(
              (title) => (
                <button
                  type="button"
                  className={title === activeSection ? "active" : undefined}
                  onClick={() => setActiveSection(title)}
                  aria-pressed={title === activeSection}
                  key={title}
                >
                  {title}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            className="random-video-button"
            onClick={showRandomVideo}
          >
            <i className="fas fa-shuffle" aria-hidden="true" />
            随机一个
          </button>
        </SearchToolbar>
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <VideoSection section={section} key={section.title} />
          ))
        ) : (
          <EmptyState />
        )}
      </main>
    </PageLayout>
  );
}
