import React, { useState } from "react";
import "../App.css";
import Category from "./Category";
import Mode from "./Mode";

const Post = () => {
    const [category, setCategory] = useState("디지털");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [mode, setMode] = useState("등록");
    const [editingPost, setEditingPost] = useState(null);
    const [soldPosts, setSoldPosts] = useState([]); 
    const [message, setMessage] = useState(""); 

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleRegister = () => {
        if (content.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        if (mode === "등록") {
            const newPost = { id: Date.now(), category, content };
            setPosts([...posts, newPost]);
            setMessage("등록이 완료되었습니다."); 
        } else if (mode === "수정" && editingPost) {
            const updatedPosts = posts.map((post) =>
                post.id === editingPost.id ? { ...post, content, category } : post
            );
            setPosts(updatedPosts);
            setMessage("수정이 완료되었습니다."); 
        }
        setContent(""); 
        setEditingPost(null); 
        setMode("목록");
    };

    const handleDelete = (id) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    const handleEdit = (post) => {
        setEditingPost(post); 
        setCategory(post.category); 
        setContent(post.content);
        setMode("수정"); 
        setMessage(""); 
    };

    const handlePurchase = (post) => {
        if (soldPosts.includes(post.id)) {
            setMessage("이미 팔린 상품입니다."); 
        } else {
            setSoldPosts([...soldPosts, post.id]); 
            setMessage("팔린 상품입니다."); 
        }
    };

    return (
        <main>
            <header>
                <h1 className="title">상품 관리</h1>
            </header>

            <section>
                <Category category={category} onCategoryChange={setCategory} disabled={mode === "삭제"} />
            </section>

            {(mode === "등록" || mode === "수정") && (
                <section className="content-box">
                    <h2>{mode === "등록" ? "상품 등록" : "상품 수정"}</h2>
                    <textarea
                        className="content-input"
                        placeholder={`${category} 카테고리에 대한 내용을 입력하세요.`}
                        value={content}
                        onChange={handleContentChange}
                        disabled={mode === "목록"}
                    />
                    <button className="register-btn" onClick={handleRegister}>
                        {mode === "등록" ? "등록하기" : "수정하기"}
                    </button>
                </section>
            )}

            {mode === "목록" && posts.length > 0 && (
                <section className="post-list">
                    <h2>등록된 항목</h2>
                    <ul>
                        {posts.map((post) => (
                            <article key={post.id} className="post-item">
                                {/* 메시지를 각 게시물 위에 표시 */}
                                {message && (
                                    <p style={{ color: 'red' }}>{soldPosts.includes(post.id) ? "이미 팔린 상품입니다." : message}</p>
                                )}
                                <p><strong>카테고리:</strong> {post.category}</p>
                                <p><strong>내용:</strong> {post.content}</p>
                                <button className="edit-btn" onClick={() => handleEdit(post)} disabled={soldPosts.includes(post.id)}>
                                    수정하기
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(post.id)} >
                                    삭제하기
                                </button>
                                <button className="purchase-btn" onClick={() => handlePurchase(post)} disabled={soldPosts.includes(post.id)}>
                                    구매하기
                                </button>
                            </article>
                        ))}
                    </ul>
                </section>
            )}

            <footer>
                <Mode mode={mode} onModeChange={setMode} />
            </footer>
        </main>
    );
};

export default Post;
