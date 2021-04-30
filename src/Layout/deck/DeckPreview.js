import React from "react";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

/**
 * A DeckPreview component will show the name and description of a deck, as well
 * as actions you can take with it.
 * @param {ComponentProps} props - Properties passed in for the component.
 * @param {Object} props.deck - A deck object representing a stack of cards.
 * @param {function} props.removeDeck - Removes the deck passed in when called.
 * @returns {ReactElement} JSX for a DeckPreview component.
 */
function DeckPreview({ deck, removeDeck }) {
  return (
    <div className="card mt-2" id={`deck-${deck.id}`}>
      <div className="card-body">
        <p className="card-subtitle mb-2 text-muted float-right">
          {deck.cards.length} cards
        </p>
        <h4 className="card-title">{deck.name}</h4>
        <p className="card-text">{deck.description}</p>
        <Buttons
          names={["view", "study", "delete-deck"]}
          deckId={deck.id}
          removeDeck={removeDeck}
        />
      </div>
    </div>
  );
}

DeckPreview.propTypes = {
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  removeDeck: PropTypes.func.isRequired,
};

export default DeckPreview;
