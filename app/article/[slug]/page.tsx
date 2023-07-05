import { notFound } from "next/navigation";

// export const dynamicParams = false;

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await (
    await fetch("https://639040c665ff4183110d7bdd.mockapi.io/blogs")
  ).json();

  return posts.map((post: any) => ({
    slug: post.id,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await fetch(
    `https://639040c665ff4183110d7bdd.mockapi.io/blogs/${slug}`
  );

  //   this is specific to the mockapi endpoint
  //   easiest way to check if no content is available at a specific endpoint
  if (res.status === 500) {
    return notFound();
  }

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
