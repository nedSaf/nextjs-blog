import Layout from "../components/layout";
// @ts-ignore
import Head from "next/head";

export default function Custom404() {
  return (
    <Layout>
        <Head>
            <title>404 - Page not found</title>
        </Head>
      <h1>404 - Page Not Found</h1>
    </Layout>
  );
}
