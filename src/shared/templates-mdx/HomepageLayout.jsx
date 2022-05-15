import React from "react";

export const HomepageLayout = ({ meta, children }) => (
  <main className="markdown-body">
    <article>
      <header className="page-header">
        <a href="/" className="page-header-title">
          {meta.sitename}
        </a>
        <a href="/" className="page-header-subtitle">
          {meta.subtitle}
        </a>
      </header>
      <main>{children}</main>
    </article>
  </main>
);
