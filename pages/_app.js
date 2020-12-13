import 'theme/styles/globals.css';
import 'theme/styles/github-markdown.css';
import { PageLayout } from 'theme/PageLayout';

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
