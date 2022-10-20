// import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Post({ postData }) {
  const [img, setImg] = useState('')
  const fetchapi = async () => {
    const res = await axios.get(`https://api.sograph.xyz/api/space/campaign/info?space_code=chamcha&campaign_code=GyVrhBzOXb`)
    setImg(res.data.data.campaign.cover_image_url)
  }
  useEffect(() => {
    fetchapi()
  }, [])
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
          content={img}
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