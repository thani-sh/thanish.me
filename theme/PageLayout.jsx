import Head from "next/head";

export const PageLayout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <main className="markdown-body">{children}</main>
    </>
  );
};
