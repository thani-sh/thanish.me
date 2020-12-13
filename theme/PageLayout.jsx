import Head from 'next/head';

function withDefaults(meta = {}) {
  return {
    title: 'TITLE',
    description: 'DESCRIPTION',
    ...meta,
  };
}

export const PageLayout = ({ children, meta }) => {
  meta = withDefaults(meta);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={meta.info}></meta>
        <title>{meta.title}</title>
      </Head>
      <main>
        <content id="page-content">{children}</content>
      </main>
    </>
  );
};
