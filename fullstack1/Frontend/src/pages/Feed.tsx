import axios from "axios";
import { useEffect, useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  section: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "60px 20px",
  },
  heading: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "40px",
    letterSpacing: "-0.5px",
  },
  postCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    overflow: "hidden",
    width: "100%",
    maxWidth: "480px",
    marginBottom: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover" as const,
  },
  caption: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: "15px",
    padding: "18px 20px",
    lineHeight: "1.5",
  },
  emptyText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: "15px",
    marginTop: "40px",
  },
};

interface Post {
  _id: string;
  image: string;
  caption: string;
}

interface ApiResponse {
  posts: Post[];
}

const Feed = () => {
  const [posts, setPost] = useState<Post[]>([]);
  console.log(posts);

  useEffect(() => {
    try {
      axios.get("http://localhost:3009/posts").then((res) => {
        setPost(res.data.post);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section style={styles.section} className="feed-section">
      <h1 style={styles.heading}>Feed</h1>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div key={post._id} style={styles.postCard}>
              <img src={post.image} alt={post.caption} style={styles.image} />
              <p style={styles.caption}>{post.caption}</p>
            </div>
          );
        })}
    </section>
  );
};

export default Feed;
