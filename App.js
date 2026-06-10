import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, genre: "Classic",
    authorBio: "American novelist known for his depiction of the Jazz Age.",
    topBooks: ["The Great Gatsby", "Tender is the Night", "This Side of Paradise"] },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, genre: "Fiction",
    authorBio: "Pulitzer Prize-winning American novelist and author.",
    topBooks: ["To Kill a Mockingbird", "Go Set a Watchman", "In Our Time"] },
  { id: 3, title: "1984", author: "George Orwell", price: 279, genre: "Dystopian",
    authorBio: "English novelist famous for his political and social commentary.",
    topBooks: ["1984", "Animal Farm", "Homage to Catalonia"] },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 259, genre: "Romance",
    authorBio: "English novelist known for romantic fiction set in English society.",
    topBooks: ["Pride and Prejudice", "Sense and Sensibility", "Emma"] },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho", price: 319, genre: "Adventure",
    authorBio: "Brazilian lyricist and novelist, one of the best-selling authors.",
    topBooks: ["The Alchemist", "Brida", "The Valkyries"] },
  { id: 6, title: "Atomic Habits", author: "James Clear", price: 399, genre: "Self-Help",
    authorBio: "American author and speaker focused on habits and continuous improvement.",
    topBooks: ["Atomic Habits", "Transform Your Habits", "The Habits Academy"] },
];

// =====================
// AuthorInfo - Class Component
// =====================
class AuthorInfo extends Component {
  componentDidMount() {
    console.log("AuthorInfo loaded for:", this.props.author);
  }

  render() {
    const { author, authorBio, topBooks, onClose } = this.props;
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 1000,
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "2px solid #e945d0",
          borderRadius: "16px",
          padding: "32px",
          width: "400px",
          maxWidth: "90vw",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ color: "#e2e2e2", margin: 0, fontFamily: "'Georgia', serif" }}>✍️ {author}</h3>
            <button onClick={onClose} style={{
              background: "#e945d0", color: "#fff", border: "none",
              borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", fontSize: "16px",
            }}>×</button>
          </div>
          <p style={{ color: "#a0a0b0", fontStyle: "italic", fontSize: "14px" }}>{authorBio}</p>
          <h5 style={{ color: "#e945d0", marginTop: "16px" }}>📚 Top 3 Books:</h5>
          <ul style={{ paddingLeft: "20px" }}>
            {topBooks.map((book, i) => (
              <li key={i} style={{ color: "#e2e2e2", marginBottom: "6px", fontSize: "14px" }}>
                {book}
              </li>
            ))}
          </ul>
          <button onClick={onClose} style={{
            background: "#e945d0", color: "#fff", border: "none",
            padding: "8px 20px", borderRadius: "8px", cursor: "pointer",
            fontSize: "13px", fontWeight: "600", marginTop: "12px", width: "100%",
          }}>Close</button>
        </div>
      </div>
    );
  }
}

AuthorInfo.propTypes = {
  author: PropTypes.string.isRequired,
  authorBio: PropTypes.string.isRequired,
  topBooks: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

// =====================
// BookCard - Functional Component with PropTypes
// =====================
function BookCard({ title, author, price, genre, viewMode, onAuthorClick }) {
  return (
    <div style={{
      background: viewMode === "Grid"
        ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
        : "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
      border: "1px solid #e945d0",
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
      e.currentTarget.style.boxShadow = "0 12px 30px rgba(233,69,208,0.3)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}>
      <div style={{
        fontSize: viewMode === "Grid" ? "40px" : "32px",
        marginBottom: viewMode === "Grid" ? "12px" : "0",
      }}>📚</div>

      <div style={{ flex: 1 }}>
        <span style={{
          background: "#e945d0", color: "#fff", fontSize: "10px",
          fontWeight: "700", padding: "3px 8px", borderRadius: "20px",
          textTransform: "uppercase", letterSpacing: "1px",
        }}>{genre}</span>

        <h3 style={{
          color: "#e2e2e2", fontSize: viewMode === "Grid" ? "16px" : "15px",
          fontFamily: "'Georgia', serif", margin: "8px 0 4px", lineHeight: 1.3,
        }}>{title}</h3>

        {/* Author - click to show AuthorInfo */}
        <p
          onClick={onAuthorClick}
          style={{
            color: "#a0c4ff", fontSize: "13px", margin: "0",
            fontStyle: "italic", cursor: "pointer", textDecoration: "underline",
          }}>
          by {author}
        </p>
      </div>

      <div style={{
        marginTop: viewMode === "Grid" ? "16px" : "0",
        display: "flex", alignItems: "center",
        justifyContent: viewMode === "Grid" ? "space-between" : "flex-end",
        gap: "12px", flexShrink: 0,
      }}>
        <span style={{
          color: "#e945d0", fontWeight: "700", fontSize: "18px", fontFamily: "monospace",
        }}>₹{price}</span>
        <button style={{
          background: "#e945d0", color: "#fff", border: "none",
          padding: "8px 16px", borderRadius: "8px", cursor: "pointer",
          fontSize: "12px", fontWeight: "600",
        }}>Buy Now</button>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  onAuthorClick: PropTypes.func.isRequired,
};

// =====================
// BookList - Composable Component
// =====================
function BookList({ books, viewMode, onAuthorClick }) {
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
          onAuthorClick={() => onAuthorClick(book)}
        />
      ))}
    </div>
  );
}

// =====================
// Main App - Class Component with Lifecycle + Refs
// =====================
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: "Grid",
      searchQuery: "",
      selectedBook: null,
    };
    this.searchRef = createRef();
  }

  componentDidMount() {
    console.log("App mounted - BookVerse Day 11 loaded!");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.viewMode !== this.state.viewMode) {
      console.log("View switched to:", this.state.viewMode);
    }
  }

  handleFocusSearch = () => {
    this.searchRef.current.focus();
  };

  handleAuthorClick = (book) => {
    this.setState({ selectedBook: book });
  };

  handleCloseAuthor = () => {
    this.setState({ selectedBook: null });
  };

  render() {
    const { viewMode, searchQuery, selectedBook } = this.state;

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
          borderBottom: "2px solid #e945d0",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div>
            <h1 style={{
              margin: 0, fontSize: "32px",
              fontFamily: "'Georgia', serif",
              color: "#fff", letterSpacing: "2px",
            }}>
              📖 <span style={{ color: "#e945d0" }}>Book</span>Verse
            </h1>
            <p style={{ margin: "4px 0 0", color: "#a0a0b0", fontSize: "13px" }}>
              Welcome Page and Featured Books
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Search Box - Controlled Component + Ref */}
            <input
              ref={this.searchRef}
              type="text"
              placeholder="🔍 Search by title or author..."
              value={searchQuery}
              onChange={e => this.setState({ searchQuery: e.target.value })}
              style={{
                background: "#0f0f1a",
                border: "1px solid #e945d0",
                color: "#e2e2e2",
                padding: "10px 16px",
                borderRadius: "30px",
                fontSize: "14px",
                width: "260px",
                outline: "none",
              }}
            />
            {/* Ref focus button */}
            <button
              onClick={this.handleFocusSearch}
              style={{
                background: "transparent",
                border: "1px solid #e945d0",
                color: "#e945d0",
                padding: "10px 16px",
                borderRadius: "30px",
                cursor: "pointer",
                fontSize: "13px",
              }}>
              🔎 Focus
            </button>
          </div>
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
          {["Grid", "List"].map(mode => (
            <button
              key={mode}
              onClick={() => this.setState({ viewMode: mode })}
              style={{
                background: viewMode === mode ? "#e945d0" : "transparent",
                color: viewMode === mode ? "#fff" : "#a0a0b0",
                border: `1px solid ${viewMode === mode ? "#e945d0" : "#3a3a5a"}`,
                padding: "8px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.2s",
              }}>
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
            <BookList
              books={filteredBooks}
              viewMode={viewMode}
              onAuthorClick={this.handleAuthorClick}
            />
          ) : (
            <div style={{ textAlign: "center", color: "#a0a0b0", padding: "60px", fontSize: "18px" }}>
              😕 No books found for "<strong>{searchQuery}</strong>"
            </div>
          )}
        </main>

        {/* AuthorInfo Modal */}
        {selectedBook && (
          <AuthorInfo
            author={selectedBook.author}
            authorBio={selectedBook.authorBio}
            topBooks={selectedBook.topBooks}
            onClose={this.handleCloseAuthor}
          />
        )}
      </div>
    );
  }
}

export default App;
