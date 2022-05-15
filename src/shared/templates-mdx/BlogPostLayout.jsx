import React from "react";

export const BlogPostLayout = ({ meta, children }) => (
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
      <header>
        <h1 className="post-head">{meta.title}</h1>
        <p className="post-meta">
          <small>Posted on {meta.date}</small>
        </p>
        <main>{meta.intro}</main>
      </header>
      <main>{children}</main>
    </article>
  </main>
);
