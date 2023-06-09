import { useEffect, useState } from 'react';
import Post from '../components/Post';

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const req = await fetch('/api/post');
        const res = await req.json();
        setPosts(res);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
};

export default Homepage;
