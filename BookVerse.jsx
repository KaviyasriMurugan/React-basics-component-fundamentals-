import { useState } from "react";

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, genre: "Classic" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, genre: "Fiction" },
  { id: 3, title: "1984", author: "George Orwell", price: 279, genre: "Dystopian" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 259, genre: "Romance" },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", price: 319, genre: "Adventure" },
  { id: 6, title: "Atomic Habits", author: "James Clear", price: 399, genre: "Self-Help" },
];

// BookCard Component
function BookCard({ title, author, price, genre, viewMode }) {
  return (
    <div style={{
      background: viewMode === "Grid"
        ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
        : "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
      border: "1px solid #e94560",
      borderRadius: viewMode === "Grid" ? "16px" : "12px",
      padding: viewMode === "Grid" ? "24px" : "16px 24px",
      display: viewMode === "List" ? "flex" : "block",
      alignItems: viewMode === "List" ? "center" : "unset",
      justifyContent: viewMode === "List" ? "space-between" : "unset",
      gap: "16px",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(233,69,96,0.3)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}>
      {/* Book Icon */}
      <div style={{
        fontSize: viewMode === "Grid" ? "40px" : "32px",
        marginBottom: viewMode === "Grid" ? "12px" : "0",
      }}>📚</div>

      <div style={{ flex: 1 }}>
        <span style={{
          background: "#e94560",
          color: "#fff",
          fontSize: "10px",
          fontWeight: "700",
          padding: "3px 8px",
          borderRadius: "20px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>{genre}</span>

        <h3 style={{
          color: "#e2e2e2",
          fontSize: viewMode === "Grid" ? "16px" : "15px",
          fontFamily: "'Georgia', serif",
          margin: "8px 0 4px",
          lineHeight: 1.3,
        }}>{title}</h3>

        <p style={{
          color: "#a0a0b0",
          fontSize: "13px",
          margin: "0",
          fontStyle: "italic",
        }}>by {author}</p>
      </div>

      <div style={{
        marginTop: viewMode === "Grid" ? "16px" : "0",
        display: "flex",
        alignItems: "center",
        justifyContent: viewMode === "Grid" ? "space-between" : "flex-end",
        gap: "12px",
        flexShrink: 0,
      }}>
        <span style={{
          color: "#e94560",
          fontWeight: "700",
          fontSize: "18px",
          fontFamily: "monospace",
        }}>₹{price}</span>
        <button style={{
          background: "#e94560",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "600",
        }}>Buy Now</button>
      </div>
    </div>
  );
}

// BookList Component
function BookList({ books, viewMode }) {
  return (
    <div style={{
      display: viewMode === "Grid" ? "grid" : "flex",
      gridTemplateColumns: viewMode === "Grid" ? "repeat(auto-fill, minmax(240px, 1fr))" : "unset",
      flexDirection: viewMode === "List" ? "column" : "unset",
      gap: "20px",
    }}>
      {books.map(book => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          price={book.price}
          genre={book.genre}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

// Main App Component
export default function App() {
  const [viewMode, setViewMode] = useState("Grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f1a",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#e2e2e2",
    }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        borderBottom: "2px solid #e94560",
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: "32px",
            fontFamily: "'Georgia', serif",
            color: "#fff",
            letterSpacing: "2px",
          }}>
            📖 <span style={{ color: "#e94560" }}>Book</span>Verse
          </h1>
          <p style={{ margin: "4px 0 0", color: "#a0a0b0", fontSize: "13px" }}>
            Welcome Page — Featured Books
          </p>
        </div>

        {/* Search Box — Controlled Component */}
        <input
          type="text"
          placeholder="🔍 Search by title or author..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            background: "#0f0f1a",
            border: "1px solid #e94560",
            color: "#e2e2e2",
            padding: "10px 16px",
            borderRadius: "30px",
            fontSize: "14px",
            width: "260px",
            outline: "none",
          }}
        />
      </header>

      {/* Controls */}
      <div style={{
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid #2a2a4a",
      }}>
        <span style={{ color: "#a0a0b0", fontSize: "14px" }}>View:</span>

        {/* Button click events to switch layout */}
        {["Grid", "List"].map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              background: viewMode === mode ? "#e94560" : "transparent",
              color: viewMode === mode ? "#fff" : "#a0a0b0",
              border: `1px solid ${viewMode === mode ? "#e94560" : "#3a3a5a"}`,
              padding: "8px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
          >
            {mode === "Grid" ? "⊞ Grid" : "☰ List"}
          </button>
        ))}

        <span style={{ marginLeft: "auto", color: "#a0a0b0", fontSize: "13px" }}>
          {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Book List */}
      <main style={{ padding: "30px 40px" }}>
        {filteredBooks.length > 0 ? (
          <BookList books={filteredBooks} viewMode={viewMode} />
        ) : (
          <div style={{ textAlign: "center", color: "#a0a0b0", padding: "60px", fontSize: "18px" }}>
            😕 No books found for "<strong>{searchQuery}</strong>"
          </div>
        )}
      </main>
    </div>
  );
}
