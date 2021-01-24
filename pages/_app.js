import 'theme/styles/globals.css';
import 'theme/styles/github-markdown.css';
import 'theme/styles/theme-specific.css';
import { PageLayout } from 'theme/PageLayout';

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
