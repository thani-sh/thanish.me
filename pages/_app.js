import "theme/styles/content.css";
import "theme/styles/customs.css";
import { PageLayout } from "theme/PageLayout";

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
