import React, { useState } from "react";
import "../App.css";
import Category from "./Category";
import Mode from "./Mode";
import logo from './logo.png'; 

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
            let message = "";
        
            if (title.trim() === "") {
                message += "제목을 입력해주세요.\n";
            }
            if (price.trim() === "") {
                message += "가격을 입력해주세요.\n";
            }
            if (content.trim() === "") {
                message += "내용을 입력해주세요.\n";
            }
            if (!image) {
                message += "이미지를 업로드해주세요.\n";
            }
        
            if (message) {
                alert(message);
                return;
            }
        if (mode === "등록") {
            const newPost = { id: Date.now(), category, title, price, content, image };
            setPosts([...posts, newPost]);
            setMessage("등록된 상품");
        } else if (mode === "수정" && editingPost) {
            const updatedPosts = posts.map((post) =>
                post.id === editingPost.id ? { ...post, category, title, price, content, image } : post
            );
            setPosts(updatedPosts);
            setMessage("등록된 상품");
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
            setMessage("판매된 상품");
        } else {
            setSoldPosts([...soldPosts, post.id]);
            setMessage("등록된 상품");
        }
    };

    const filteredPosts = mode === "목록" ? posts.filter(post => post.category === category) : posts;

    return (
        <main>
            <header>
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="title">당근마켓</h1>
            </header>

            {(mode === "등록" || mode === "수정") && (
                <section>
                    <Category category={category} onCategoryChange={setCategory} />
                </section>
            )}

            {(mode === "등록" || mode === "수정") && (
                <section className="content-box">
                    <h2>{mode === "등록" ? "상품 등록" : "상품 수정"}</h2>
                    {image && <img src={image} alt="업로드된 이미지" className="preview-image" />}
                    <input type="text" className="title-input" placeholder="제목을 입력하세요." value={title} onChange={handleTitleChange} />
                    <input type="text" className="price-input" placeholder="가격을 입력하세요." value={price} onChange={handlePriceChange} />
                    <textarea className="content-input" placeholder={`${category} 카테고리에 대한 내용을 입력하세요.`} value={content} onChange={handleContentChange} />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
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
                                        <p style={{ color: 'red' }}>{soldPosts.includes(post.id) ? "판매된 상품" : message}</p>
                                    )}
                                    <section className="post-group">
                                        {post.image && <img src={post.image} alt="상품 이미지" className="post-image" />}
                                    <section className="post-texts">
                                        <p><strong>카테고리:</strong> {post.category}</p>
                                        <p><strong>제목:</strong> {post.title}</p>
                                        <p><strong>가격:</strong> {post.price}</p>
                                        <p><strong>내용:</strong> {post.content}</p>
                                    </section>
                                    </section>
                                    <section className="post-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(post)} disabled={soldPosts.includes(post.id)}>수정하기</button>
                                    <button className="delete-btn" onClick={() => handleDelete(post.id)}>삭제하기</button>
                                    <button className="purchase-btn" onClick={() => handlePurchase(post)} disabled={soldPosts.includes(post.id)}>구매하기</button>
                                    </section>
                                </article>
                            ))}
                        </ul>
                    ) : (
                        <article className="post-item">
                            <h3>등록된 상품이 없습니다.</h3>
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