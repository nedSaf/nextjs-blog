import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
// @ts-ignore
import Head from "next/head";
import DateElement from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
// @ts-ignore
import { GetStaticProps, GetStaticPaths } from "next";

/**
 *  Get the IDs of all the posts for mapping paths.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

/**
 * Get the current post's data.
 *
 * @param params : object
 *   The params.
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

/**
 * Render the post page.
 *
 * @param postData : Post
 *   The post.
 *
 * @constructor
 */
export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateElement timestamp={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
