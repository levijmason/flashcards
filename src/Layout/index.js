import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import {
  listDecks,
  deleteDeck,
  createDeck,
  deleteCard,
  updateDeck,
  createCard,
  updateCard,
} from "../utils/api/index";
import Header from "./comp/Header";
import NotFound from "./error/NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import Form from "./form/Form";

/**
 * A Layout component is the root file which routes to other components
 * appropriately.
 * @returns {ReactElement} JSX for a Layout component.
 */

function Layout() {
  const [decks, setDecks] = useState([]);
  const abortController = new AbortController();
  const signal = abortController.signal;
  const history = useHistory();

  async function getDecks() {
    try {
      const response = await listDecks(signal);
      setDecks(response);
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }


  useEffect(() => {
    getDecks();

    return () => {
      abortController.abort();
    };

  });


  /**
   * Posts a deck to the database.
   * @param {Object} deck - A deck object representing a stack of cards.
   * @returns {number} The id of the newly created deck.
   */
  async function addDeck(deck) {
    const created = await createDeck(deck, signal);
    getDecks();
    return created.id;
  }

  /**
   * Posts a card in the database.
   * @param {Object} card - A card object representing a flashcard.
   * @param {number} id - The id of the deck to post in.
   * @returns {number} The id of the newly edited card.
   */

  async function addCard(card, id) {
    const created = await createCard(id, card, signal);
    getDecks();
    return created.id;
  }

  /**
   * Updates a deck in the database.
   * @param {Object} deck - A deck object representing a stack of cards.
   * @returns {number} The id of the newly edited deck.
   */
  async function editDeck(deck) {
    const edited = await updateDeck(deck, signal);
    getDecks();
    return edited.id;
  }

  /**
   * Updates a card in the database.
   * @param {Object} card - A card object representing a flashcard.
   * @returns {number} The id of the newly edited card.
   */
  async function editCard(card) {
    const edited = await updateCard(card, signal);
    getDecks();
    return edited.id;
  }

  /**
   * Deletes a deck in the database.
   * @param {Object} id - id of the deck to delete.
   */
  async function removeDeck(id) {
    if (
      window.confirm(`Delete this deck?\n\nYou will not be able to recover it.`)
    ) {
      await deleteDeck(id, signal);
      getDecks();
      history.push("/");
    }
  }

  /**
   * Deletes a card in the database.
   * @param {Object} id - id of the card to delete.
   */
  async function removeCard(id) {
    if (
      window.confirm(`Delete this card?\n\nYou will not be able to recover it.`)
    ) {
      await deleteCard(id, signal);
      getDecks();
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} removeDeck={removeDeck} />
          </Route>

          <Route path="/decks/new">
            <Form
              type="deck"
              edit={false}
              addDeck={addDeck}
              abortController={abortController}
            />
          </Route>

          <Route path="/decks/:deckId/">
            <Deck
              editDeck={editDeck}
              removeDeck={removeDeck}
              addCard={addCard}
              editCard={editCard}
              removeCard={removeCard}
              abortController={abortController}
            />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
