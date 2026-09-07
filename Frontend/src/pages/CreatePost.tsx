const styles: Record<string, React.CSSProperties> = {
  section: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "32px",
    textAlign: "center",
    letterSpacing: "-0.5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  fileInput: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.7)",
    cursor: "pointer",
    padding: "14px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
  },
  textInput: {
    width: "100%",
    padding: "14px 18px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    border: "none",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.1s",
    letterSpacing: "0.3px",
  },
};

import axios from "axios";
const CreatePost = () => {
  const handleSubmit = async (e: any) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      console.log("formdata request send", formData);

      axios
        .post("http://localhost:3009/create-post", formData)
        
        .then((res) => {
          // Example for Express/Helmet or similar middleware
          // alert("Post created Successfully");
          console.log(res);
          e.target.reset();
        })

        .catch((error) => {
          console.log(error);
          alert("Error creating post");
        });
 
  };

  return (
    <section style={styles.section}>
      <h1 style={styles.heading}>Create post</h1>
      <form style={styles.form} action="" onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          style={styles.fileInput}
        />
        <input
          type="text"
          name="caption"
          placeholder="Enter caption"
          required
          style={styles.textInput}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
