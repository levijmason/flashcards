import React from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Form from "../form/Form";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import PropTypes from "prop-types";

/**
 * A Deck component will display deck-related pages, depending on the url.
 * @param {ComponentProps} props - Properties passed in for the component.
 * @param {function} props.editDeck - Edits the deck passed in when called.
 * @param {function} props.removeDeck - Removes the deck passed in when called.
 * @param {function} props.addCard - Adds the card passed in to a deck when called.
 * @param {function} props.editCard - Edits the card passed in when called.
 * @param {function} props.removeCard - Removes the card passed in when called.
 * @param {AbortController} props.abortController - AbortController.
 * @returns {ReactElement} JSX for a Deck component.
 */
function Deck({
  editDeck,
  removeDeck,
  addCard,
  editCard,
  removeCard,
  abortController,
}) {
  const { deckId } = useParams();

  /* -------- old implementation -------- */
  /*
		if(!decks) return null;
		const deck = decks.find((deck) => deck.id === parseInt(deckId));
		if(!deck) return null; 
	*/

  return (
    <div id={`deck-${deckId}`}>
      <Switch>
        <Route path="/decks/:deckId/study">
          <DeckStudy abortController={abortController} />
        </Route>

        <Route path="/decks/:deckId/edit">
          <Form
            type="deck"
            edit={true}
            editDeck={editDeck}
            abortController={abortController}
          />
        </Route>

        <Route path="/decks/:deckId/cards/new">
          <Form
            type="card"
            edit={false}
            addCard={addCard}
            abortController={abortController}
          />
        </Route>

        <Route path="/decks/:deckId/cards/:cardId/edit">
          <Form
            type="card"
            edit={true}
            editCard={editCard}
            abortController={abortController}
          />
        </Route>

        <Route path="/decks/:deckId">
          <DeckView
            removeDeck={removeDeck}
            removeCard={removeCard}
            abortController={abortController}
          />
        </Route>
      </Switch>
    </div>
  );
}

Deck.propTypes = {
  editDeck: PropTypes.func.isRequired,
  removeDeck: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  abortController: PropTypes.instanceOf(AbortController).isRequired,
};

export default Deck;
