// import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    // <Layout>
    <>
      <Head>
        <title>{postData.title}</title>
        <meta
          name="description"
          content="Learn how to build a ssg-ssr"
        />
        <meta
          property="og:image"
          content={`https://sograph-static.s3.ap-southeast-1.amazonaws.com/dashboard/images/7B2B2E1CB3F1899C9E6D5100782792B0.png`}
        />
        <meta name="og:title" content={'ssg-ssr'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
    // </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}