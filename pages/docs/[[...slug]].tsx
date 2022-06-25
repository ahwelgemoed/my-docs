import Head from "next/head";
import DocsLayout from "../../components/DocsLayout";
import { getFileData } from "../../lib/readDocs";

const index = (props: any) => {
  console.log("props", props.htmlData?.matter);
  return (
    <div>
      <Head>
        <title>{props?.htmlData?.matter?.title}</title>
        <meta
          name="keywords"
          content={props?.htmlData?.matter?.tags.join(" ")}
        ></meta>
        <meta
          name="description"
          content={props?.htmlData?.matter?.description}
        ></meta>
        <meta name="description" content="PWA Mendix Documentation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DocsLayout>
        <h1 className="text-gray-900 text-2xl leading-tight font-medium mb-2">
          {props?.htmlData?.matter?.title}
        </h1>
        <p className="text-gray-600 text-xs">
          {props?.htmlData?.matter?.description}
        </p>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: props?.htmlData?.html }}
        />
      </DocsLayout>
    </div>
  );
};

export default index;

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }: any) {
  const htmlData = await getFileData(params.slug.join("/"));
  return {
    props: {
      ...params,
      htmlData,
    },
  };
}
