import { notFound } from "next/navigation";

export const dynamicParams = false;

async function getData() {
  return await (
    await fetch("https://6450fdc8e1f6f1bb22a4b4c7.mockapi.io/post")
  ).json();
}

export async function generateStaticParams() {
  const posts = await getData();

  return posts.map((post: any) => ({
    slug: post.id,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const posts = await getData();

  // lookup the id in the blob, if none found, throw notFound()
  if (posts.find((v: any) => v.id === params.slug) === undefined) {
    notFound();
  }

  const { slug } = params;
  const res = await fetch(
    `https://6450fdc8e1f6f1bb22a4b4c7.mockapi.io/post/${slug}`
  );

  const content = await res.json();

  return (
    <>
      {content && (
        <main>
          <h1>{content.title}</h1>
          <p>{content.body}</p>
          <p>auther: {content.name}</p>
        </main>
      )}
    </>
  );
}
