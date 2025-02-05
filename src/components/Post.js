import React, { useState } from "react";
import "../App.css";
import Category from "./Category";
import Mode from "./Mode";

const Post = () => {
    const [category, setCategory] = useState("디지털");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [mode, setMode] = useState("등록");
    const [editingPost, setEditingPost] = useState(null);
    const [soldPosts, setSoldPosts] = useState([]);
    const [message, setMessage] = useState("");

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handlePriceChange = (event) => setPrice(event.target.value);
    const handleContentChange = (event) => setContent(event.target.value);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = () => {
        if (title.trim() === "" || content.trim() === "") {
            alert("제목과 내용을 입력해주세요.");
            return;
        }
        if (mode === "등록") {
            const newPost = { id: Date.now(), category, title, price, content, image };
            setPosts([...posts, newPost]);
            setMessage("등록이 완료되었습니다.");
        } else if (mode === "수정" && editingPost) {
            const updatedPosts = posts.map((post) =>
                post.id === editingPost.id ? { ...post, category, title, price, content, image } : post
            );
            setPosts(updatedPosts);
            setMessage("수정이 완료되었습니다.");
        }
        setTitle("");
        setPrice("");
        setContent("");
        setImage(null);
        setEditingPost(null);
        setMode("목록");
    };

    const handleDelete = (id) => setPosts(posts.filter(post => post.id !== id));

    const handleEdit = (post) => {
        setEditingPost(post);
        setCategory(post.category);
        setTitle(post.title);
        setPrice(post.price);
        setContent(post.content);
        setImage(post.image);
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

    const filteredPosts = mode === "목록" ? posts.filter(post => post.category === category) : posts;

    return (
        <main>
            <header>
                <h1 className="title">상품 관리</h1>
            </header>

            {(mode === "등록" || mode === "수정") && (
                <section>
                    <Category category={category} onCategoryChange={setCategory} />
                </section>
            )}

            {(mode === "등록" || mode === "수정") && (
                <section className="content-box">
                    <h2>{mode === "등록" ? "상품 등록" : "상품 수정"}</h2>
                    <input type="text" className="title-input" placeholder="제목을 입력하세요." value={title} onChange={handleTitleChange} />
                    <input type="text" className="price-input" placeholder="가격을 입력하세요." value={price} onChange={handlePriceChange} />
                    <textarea className="content-input" placeholder="내용을 입력하세요." value={content} onChange={handleContentChange} />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="업로드된 이미지" className="preview-image" />}
                    <button className="register-btn" onClick={handleRegister}>{mode === "등록" ? "등록하기" : "수정하기"}</button>
                </section>
            )}

            {mode === "목록" && (
                <section>
                    <Category category={category} onCategoryChange={setCategory} />
                    <h2>{category} 게시물</h2>
                    {filteredPosts.length > 0 ? (
                        <ul className="post-list">
                            {filteredPosts.map((post) => (
                                <article key={post.id} className="post-item">
                                    {message && (
                                        <p style={{ color: 'red' }}>{soldPosts.includes(post.id) ? "이미 팔린 상품입니다." : message}</p>
                                    )}
                                    <p><strong>카테고리:</strong> {post.category}</p>
                                    <p><strong>제목:</strong> {post.title}</p>
                                    <p><strong>가격:</strong> {post.price}</p>
                                    <p><strong>내용:</strong> {post.content}</p>
                                    {post.image && <img src={post.image} alt="상품 이미지" className="post-image" />}
                                    <button className="edit-btn" onClick={() => handleEdit(post)} disabled={soldPosts.includes(post.id)}>수정하기</button>
                                    <button className="delete-btn" onClick={() => handleDelete(post.id)}>삭제하기</button>
                                    <button className="purchase-btn" onClick={() => handlePurchase(post)} disabled={soldPosts.includes(post.id)}>구매하기</button>
                                </article>
                            ))}
                        </ul>
                    ) : (
                        <article className="post-item">
                            <h3>등록된 게시물이 없습니다.</h3>
                        </article>
                    )}
                </section>
            )}

            <footer>
                <Mode mode={mode} onModeChange={setMode} />
            </footer>
        </main>
    );
};

export default Post;