import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
    section: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "60px 20px",
    },
    // ADDED: New premium action button styling matching your dark glassmorphic layout
    createButton: {
        backgroundColor: "#6366f1",
        color: "#ffffff",
        border: "none",
        borderRadius: "30px",
        padding: "12px 28px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        letterSpacing: "0.5px",
        boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
        marginBottom: "24px",
        transition: "transform 0.2s ease, background-color 0.2s",
        outline: "none"
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
        objectFit: "cover",
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


const Feed = () => {
    const [posts, setPost] = useState([]);
    console.log(posts);
    const navigate = useNavigate()
    useEffect(() => {
        try {
            axios.get('http://localhost:3000/posts').then((res) => {
                setPost(res.data.post)
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <section style={styles.section} className="feed-section">
            {/* UPDATED: Injected style hook cleanly onto your untouched onclick logic */}
            <button style={styles.createButton} onClick={() => navigate('/create-post')}>
                + Create Post
            </button>
            
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
