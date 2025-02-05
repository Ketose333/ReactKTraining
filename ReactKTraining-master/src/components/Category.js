import React from "react";

const Category = ({ category, onCategoryChange }) => {
    const categories = ["디지털", "의류", "가구", "생활용품"];

    return (
        <div className="category-bar">
            {categories.map((cat) => (
                <button
                    key={cat}
                    className={`category-btn ${category === cat ? "active" : ""}`}
                    onClick={() => onCategoryChange(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default Category;