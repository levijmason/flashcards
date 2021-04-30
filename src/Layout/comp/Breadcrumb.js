import React from "react";
import PropTypes from "prop-types";

/**
 * A Breadcrumb component is displayed on certain pages which provides a trail
 * of links the user is currently at.
 * @param {ComponentProps} props - Properties passed in for the component.
 * @param {string} props.page - The current page the user is at.
 * @param {string} props.deckName - The name of the deck they are in.
 * @param {number} props.deckId - The id of the deck they are at.
 * @param {number} props.cardId - The id of the card they are at.
 * @returns {ReactElement} JSX for a Breadcrumb component.
 */
function Breadcrumb({ page, deckName, deckId, cardId }) {
  /**
   * Gets the appropriate text based off of their current page.
   * @returns {ReactElement} JSX of an <li> element.
   */
  const currentPage = () => {
    switch (page) {
      case "study":
        return <li className="breadcrumb-item active">Study</li>;
      case "create-deck":
        return <li className="breadcrumb-item active">Create Deck</li>;
      case "edit-deck":
        return <li className="breadcrumb-item active">Edit Deck</li>;
      case "create-card":
        return <li className="breadcrumb-item active">Add Card</li>;
      case "edit-card":
        return <li className="breadcrumb-item active">Edit Card {cardId}</li>;
      default:
        return null;
    }
  };

  /**
   * Gets the deck title and adds the active class if appropriate.
   * @returns {ReactElement} JSX of an <li> element.
   */
  const deckTitle = () => {
    if (!deckName || !deckId) return null;

    return (
      <li className={`breadcrumb-item ${page === "view" ? "active" : ""}`}>
        {page === "view" ? (
          deckName
        ) : (
          <a href={`/decks/${deckId}`}>{deckName}</a>
        )}
      </li>
    );
  };

  return (
    <div id="deck-study">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-house-door-fill"
                viewBox="0 0 20 20"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
              </svg>
              Home
            </a>
          </li>
          {deckTitle()}
          {currentPage()}
        </ol>
      </nav>
    </div>
  );
}

Breadcrumb.propTypes = {
  page: PropTypes.string.isRequired,
  deckName: PropTypes.string,
  deckId: PropTypes.number,
  cardId: PropTypes.number,
};

export default Breadcrumb;
