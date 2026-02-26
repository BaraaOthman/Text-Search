import { useState } from "react";
import "./App.css";

const articles = [
  {
    title: "Understanding the difference between grid-template and grid-auto",
    date: "Oct 09, 2018",
    content:
      "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns. Although I knew they were to do with the explicit and implicit grid systems, at face value they seemed to be doing almost the same thing. In actual fact, they have little in common and are used to achieve different things."
  },
  {
    title: "What;s New in HTML 5.2?",
    date: "Jan 8, 2018",
    content:
      "Less than a month ago, HTML 5.2 became an official W3C Recommendation (REC). When a specification reaches the REC stage, this means that it has received the official endorsement of W3C Members and the Director, and that the W3C officially recommends it's deployment by user agents, and it's implementation by web page authors."
  },
  {
    title: "CSS Grid Layout Terminology, Explained",
    date: "Feb 2, 2017",
    content:
      "The grid is an intersecting set of horizontal and vertical grid lines that divides the grid container's space into grid areas, into which grid items (representing the grid container's content) can be placed"
  }
];

function App() {

  // This stores whatever the user types in the search box
  const [keyword, setKeyword] = useState("");

  // Small helper to highlight the searched word inside any text
  function highlight(text, keyword) {

    // If nothing is typed, just return the original text
    if (!keyword) return text;

    // Escape special characters so the regex does not break
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`(${escaped})`, "gi");

    // We return HTML because we want to wrap matches with a span
    return text.replace(regex, `<span class="highlight">$1</span>`);
  }

  // Filter articles based on what the user typed
  const filteredArticles = articles.filter(article => {

    // I search in both title and content together
    const fullText =
      (article.title + " " + article.content).toLowerCase();

    return fullText.includes(keyword.toLowerCase());
  });

  return (
    <div className="container">
      <h2>Search</h2>

      {/* Controlled input – React owns the value */}
      <input
        type="text"
        placeholder="Type to search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* Only show the counter when the user actually typed something */}
      {keyword && (
        <div className="result-count">
          {filteredArticles.length} posts were found.
        </div>
      )}

      <div>
        {filteredArticles.map((article, index) => (
          <div className="article" key={index}>

            {/* 
              We use dangerouslySetInnerHTML because we are inserting
              HTML (the span used for highlight).
              In real life you would be careful with this if the data
              comes from users or a backend.
            */}
            <h3
              dangerouslySetInnerHTML={{
                __html: highlight(article.title, keyword)
              }}
            />

            <small>{article.date}</small>

            <p
              dangerouslySetInnerHTML={{
                __html: highlight(article.content, keyword)
              }}
            />

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;