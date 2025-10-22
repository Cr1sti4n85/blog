import Hero from "@/components/Hero";
import Posts from "@/components/Posts";
import { fetchPosts } from "@/lib/actions/postActions";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page;
  const { posts, totalPosts } = await fetchPosts({
    page: page ? +page : undefined,
  });
  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
}
