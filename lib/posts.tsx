/**
 *  Get the all the posts sorted by date.
 */
export async function getSortedPostsData() {
  // Get posts from the API.
  const res = await fetchPostsFromApi();
  const allPostsData = res.props.posts.map((post) => {
    const id = post.id;

    const postData = {
      title: post.name,
      date: post.created,
    };

    // Combine the data with the id.
    return {
      id,
      ...postData,
    };
  });

  // Sort posts by date.
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get all the IDs of the posts.
 */
export async function getAllPostIds() {
  const res = await fetchPostsFromApi();

  return res.props.posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

/**
 *  Get the Post's data (i.e. title, date, etc...).
 *
 * @param id : string
 *   The post's ID.
 */
export async function getPostData(id: string) {
  const res = await fetchPostsFromApi(id);
  const post = res.props.posts[0];
  if (!post) {
    // Return page 404 if no post data was found from the API.
    return { notFound: true };
  }

  const postData = {
    title: post.name,
    date: post.created,
    // Some posts might not contain a body.
    contentHtml: post.post_body ?? "",
  };

  // Combine the data with the id.
  return {
    id,
    ...postData,
  };
}

/**
 * Fetch the posts from the hardcoded API.
 *
 * @param id : string
 *   Optional; An ID of a specific post to fetch.
 */
async function fetchPostsFromApi(id: string = "") {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const url = id
    ? "https://api.hubapi.com/content/api/v2/blog-posts?hapikey=demo&id=" + id
    : "https://api.hubapi.com/content/api/v2/blog-posts?hapikey=demo";
  const res = await fetch(url);
  const jsonRes = await res.json();
  const posts = jsonRes.objects;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
