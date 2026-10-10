import axios, { Axios } from 'axios';
import React from 'react'
import { useNavigate } from "react-router-dom"
const uploadPost = () => {
    const navigation = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SUBMIT HANDLER FIRED");

        const form = e.currentTarget;
        const formData = new FormData(form);

        console.log("image:", formData.get("image"));
        console.log("caption:", formData.get("caption"));

        await axios
            .post("http://localhost:3000/createPost", formData)
            .then((res) => {
                navigation('/feed')
                form.reset()
                console.log("SERVER RESPONSE:", res.data);
            })
            .catch((err) => {
                console.log('server Error:', err);
            });
        if (!form) {
            return
        }
    }

    return (
        <section style={styles.section}>
            <h1 style={styles.heading}>Create post</h1>

            <form style={styles.form} onSubmit={handleSubmit}>
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
    )
}

const styles = {
    section: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    heading: {
        fontSize: '1.75rem',
        color: '#111827',
        marginBottom: '24px',
        fontWeight: '700',
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#ffffff',
        width: '100%',
        // Mobile first width constraint (scales beautifully on desktop)
        maxWidth: '440px',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box',
    },
    fileInput: {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px dashed #d1d5db',
        backgroundColor: '#f9fafb',
        fontSize: '0.875rem',
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    textInput: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '0.95rem',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    button: {
        width: '100%',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        padding: '12px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        marginTop: '8px',
    },
};

export default uploadPost