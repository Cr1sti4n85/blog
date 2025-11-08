import Hero from "@/components/Hero";
import Posts from "@/components/Posts";
import { fetchPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const page = resolvedParams?.page;
  const { posts, totalPosts } = await fetchPosts({
    page: page ? +page : undefined,
  });
  // const session = await getSession();
  return (
    <main>
      <Hero />
      <Posts
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.floor(totalPosts / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}
