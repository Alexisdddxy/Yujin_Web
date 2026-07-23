import { useEffect, useState } from "react";
import { PageLayout } from "../components/SiteChrome";
import { siteData } from "../data/siteData";

const quickEntryDetails = {
  "basic-info.html": {
    icon: "far fa-id-card",
    eyebrow: "PROFILE",
    description: "认识安宥真的基本资料与演艺经历",
  },
  "microblog.html": {
    icon: "far fa-comments",
    eyebrow: "MICROBLOG",
    description: "快速找到值得关注的微博账号",
  },
  "bilibili.html": {
    icon: "far fa-circle-play",
    eyebrow: "VIDEOS",
    description: "浏览 Cover、直拍与综艺视频",
  },
  "others.html": {
    icon: "far fa-paper-plane",
    eyebrow: "SOCIAL",
    description: "前往 Instagram、Twitter 与 YouTube",
  },
};

export function HomePage() {
  const keywords = siteData.profile.groups
    .flatMap((group) => group.rows)
    .find((row) => row.label === "关键词：")
    .value.split("、");
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setKeywordIndex((current) => (current + 1) % keywords.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [keywords.length]);

  const quickEntries = siteData.nav
    .filter((item) => item.href !== "index.html")
    .map((item) => ({ ...item, ...quickEntryDetails[item.href] }));

  return (
    <PageLayout currentPage="index.html">
      <main className="home-page">
        <section className="hero">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="hero-kicker">ALL FOR YUJIN · FAN GUIDE</p>
              <h1 className="animate-text">{siteData.home.title}</h1>
              <div className="hero-actions">
                <a href="basic-info.html" className="primary-action">
                  开始探索 <span aria-hidden="true">↗</span>
                </a>
                <a href="bilibili.html" className="secondary-action">
                  随便看看
                </a>
              </div>
              <div className="hero-facts" aria-label="安宥真信息摘要">
                <span>
                  <strong>2003.09.01</strong>
                  <small>生日</small>
                </span>
                <span>
                  <strong>IVE</strong>
                  <small>组合</small>
                </span>
                <span>
                  <strong>LEADER</strong>
                  <small>队长</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-entries" aria-labelledby="entry-title">
          <div className="section-heading">
            <p>EXPLORE</p>
            <h2 id="entry-title">从这里开始</h2>
          </div>
          <div className="entry-grid">
            {quickEntries.map((item, index) => (
              <a
                href={item.href}
                className="entry-card"
                style={{ "--entry-index": index }}
                key={item.href}
              >
                <div className="entry-card-top">
                  <i className={item.icon} aria-hidden="true" />
                  <span>{item.eyebrow}</span>
                </div>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
                <span className="entry-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
