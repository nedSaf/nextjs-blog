export async function getSortedPostsData() {
  // Get file names under /posts
  const res = await fetchPostsFromApi();
  const allPostsData = res.props.posts.map((post) => {
    const id = post.id;

    const postData = {
      'title': post.name,
      'date': post.created,
    };

    // Combine the data with the id
    return {
      id,
      ...postData,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

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

export async function getPostData(id: string) {
  const res = await fetchPostsFromApi(id);
  const post = res.props.posts[0];
  if (!post) {
    return {notFound: true};
  }

  const postData = {
    title: post.name,
    date: post.created,
    contentHtml: post.post_body,
  };

  // Combine the data with the id.
  return {
    id,
    ...postData,
  };
}

async function fetchPostsFromApi(id : string = '') {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const url = id ? 'https://api.hubapi.com/content/api/v2/blog-posts?hapikey=demo&id=' + id : 'https://api.hubapi.com/content/api/v2/blog-posts?hapikey=demo';
  const res = await fetch(url);
  const jsonRes = await res.json();
  const posts = jsonRes.objects;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}
