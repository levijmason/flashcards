import React from "react";
import Buttons from "../comp/Buttons";
import PropTypes from "prop-types";

/**
 * A NotEnoughCards component is displayed when a user tries to study a deck
 * with too little cards.
 * @param {ComponentProps} props - Properties passed in for the component.
 * @param {number} length - How many cards are in the deck.
 * @param {number} id - The id of the deck they are at.
 * @returns {ReactElement} JSX for a NotEnoughCards component. 
 */
function NotEnoughCards({ length, id }) {
	return (
		<div id="card-error">
			<h3>Not enough cards.</h3>
			<p>You need at least 3 cards to study. There are {length} cards in this deck.</p>

			<Buttons names={["add-card"]} deckId={id} />
		</div>
	);
}

NotEnoughCards.propTypes = {
	length: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
};

export default NotEnoughCards;