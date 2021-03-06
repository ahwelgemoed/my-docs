import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FilesInPath, filesInRelativePath } from "../lib/readDocs";
import styles from "../styles/Home.module.css";

type HomePageProps = {
  allDocs: FilesInPath[];
};

const Home: NextPage<HomePageProps> = ({ allDocs }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>PWA Mendix Docs</title>
        <meta name="description" content="PWA Mendix Documentation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl underline">The quick brown fox ...</h1>
      </main>
      <section>
        <h3>Docs</h3>
        <div>
          {allDocs.map((doc) => {
            return (
              <div key={doc.fullPath} style={{ padding: 10 }}>
                <Link className="underline" href={`/docs${doc.relativePath}`}>
                  {doc.relativePath}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;

export async function getStaticProps({}) {
  const allMarkdownFiles = await filesInRelativePath();
  return {
    props: {
      allDocs: allMarkdownFiles,
    },
  };
}
