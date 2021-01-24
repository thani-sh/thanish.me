import Head from 'next/head';

export const PageLayout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <header id="navbar">
        <a id="link-home" href="/">
          <img src="/logo-192.png" alt="Homepage" width="64px" height="64px" />
        </a>
      </header>
      <main>
        <content className="markdown-body">{children}</content>
      </main>
    </>
  );
};
