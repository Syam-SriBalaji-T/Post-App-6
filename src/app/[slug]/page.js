export default async function PostPage(propsPromise) {
  const { params } = await propsPromise; // ✅ Fix: Await the props
  const slug = params.slug;

  try {
    // ✅ Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return <h2>Post not found</h2>;
    }

    const data = await res.json();

    return (
      <div>
        <h2>{data.post_title}</h2>
        <p>{data.post_description}</p>
        {data.post_url && (
          <img
            src={data.post_url}
            alt={data.post_title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return <h2>Error loading post</h2>;
  }
}

// Optional for SSG (you're using dynamic routes, so leave empty for now)
export async function generateStaticParams() {
  return [];
}


/* export default async function PostPage({ params }) {
  const slug = params.slug;

  try {

    const res = await fetch(`/api/posts/${slug}`, {
      cache: 'no-store',
    });


    if (!res.ok) {
      return <h2>Post not found</h2>;
    }

    const data = await res.json();

    return (
      <div>
        <h2>{data.post_title}</h2>
        <p>{data.post_description}</p>
        {data.post_url && (
          <img
            src={data.post_url}
            alt={data.post_title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return <h2>Error loading post</h2>;
  }
}

export async function generateStaticParams() {
  return [];
}
 */