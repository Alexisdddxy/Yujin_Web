export function SearchToolbar({
  value,
  onChange,
  placeholder,
  resultCount,
  children,
}) {
  return (
    <div className="search-toolbar">
      <label className="search-box">
        <i className="fas fa-magnifying-glass" aria-hidden="true" />
        <span className="sr-only">{placeholder}</span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        {value && (
          <button type="button" onClick={() => onChange("")} aria-label="清空搜索">
            ×
          </button>
        )}
      </label>
      {children}
      <span className="result-count">{resultCount} 项</span>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="empty-state">
      <i className="far fa-face-smile" aria-hidden="true" />
      <p>没有找到相关内容，换个关键词试试吧。</p>
    </div>
  );
}
