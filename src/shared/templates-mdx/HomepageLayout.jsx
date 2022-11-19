import React from "react";

export const HomepageLayout = ({ meta, children }) => (
  <>
    <a href={meta.repoLink} className="button-link button-link-code">
      <img src="/icons/github.svg" width="16px" />
    </a>
    <main className="markdown-body">
      <article>
        <header className="page-header">
          <a href="/" className="page-header-title">
            {meta.sitename}
          </a>
          <a href="/" className="page-header-subtitle">
            {meta.subtitle}
          </a>
          <p className="social-links">
            <a href={meta.socialLinks.github} className="button-link">
              <img src="/icons/github.svg" width="16px" />
            </a>
            <a href={meta.socialLinks.linkedin} className="button-link">
              <img src="/icons/linkedin.svg" width="16px" />
            </a>
            <a href={meta.socialLinks.itchdotio} className="button-link">
              <img src="/icons/itchdotio.svg" width="16px" />
            </a>
            <a href={meta.socialLinks.twitter} className="button-link">
              <img src="/icons/twitter.svg" width="16px" />
            </a>
            <a href={meta.socialLinks.facebook} className="button-link">
              <img src="/icons/facebook.svg" width="16px" />
            </a>
          </p>
        </header>
        <main>{children}</main>
      </article>
    </main>
  </>
);
