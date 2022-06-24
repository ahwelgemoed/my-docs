import { getFileData } from "../../lib/readDocs";

const index = (props: any) => {
  console.log("props", props);
  return (
    <div>
      <h1>An Post</h1>
      <div dangerouslySetInnerHTML={{ __html: props?.htmlData?.html }} />
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
