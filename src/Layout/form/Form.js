import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { readDeck, readCard } from "../../utils/api/index";
import Breadcrumb from "../comp/Breadcrumb";
import FormArea from "./FormArea";
import PropTypes from "prop-types";

/**
 * A Form component is used to create and edit decks and cards.
 * @param {ComponentProps} props - Properties passed in for the component.
 * @param {string} props.type - Either "deck" or "card".
 * @param {boolean} props.edit - True if user is editing.
 * @param {function} props.addDeck - Adds the deck passed in when called.
 * @param {function} props.addCard - Adds the card passed in to a deck when called.
 * @param {function} props.editDeck - Edits the deck passed in when called.
 * @param {function} props.editCard - Edits the card passed in when called.
 * @param {AbortController} props.abortController - AbortController.
 * @returns {ReactElement} JSX for a Form component.
 */
function Form({ type, edit, addDeck, addCard, editDeck, editCard, abortController }) {
	const history = useHistory();
	let { deckId, cardId } = useParams();
	const mode = edit ? "edit" : "create";
	const keys = type === "deck" ? ["name", "description"] : ["front", "back"];

	const initForm = {
		[keys[0]]: "",
		[keys[1]]: "",
	};

	const [deck, setDeck] = useState({});
	const [formData, setFormData] = useState({...initForm});

	// get deck when first rendered.
	useEffect(() => {
		getDeck();

		return () => {
			abortController.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	/**
	 * Fetches the current deck from the database.
	 */
	async function getDeck() {
		if(type === "deck" && !edit) return;

		try {
			const response = await readDeck(deckId, abortController.signal);
			setDeck(response);

			// update values if we are editing existing items
			if(edit) {
				if(response && type === "deck") {
					initForm[keys[0]] = response.name;
					initForm[keys[1]] = response.description;
				}
				else if(type === "card") {
					const card = await readCard(cardId, abortController.signal);
					if(card) {
						initForm[keys[0]] = card.front;
						initForm[keys[1]] = card.back;
					}
				}
				setFormData({...initForm});
			}
		}
		catch(error) {
			if(error.name !== "AbortError") {
				throw error;
			}
		}
	}

	/**
	 * Handles any form change made by the user.
	 * @param {Event} event - onChange event.
	 * @param {EventTarget} target - The element from which this change occured.
	 */
	function handleChange({ target }) {
		setFormData({...formData, [target.name]: target.value});
	}

	/**
	 * Handles any submit made by the user.
	 * @param {Event} event - submit event.
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		let newItem = {
			[keys[0]]: formData[keys[0]],
			[keys[1]]: formData[keys[1]],
		};

		// if edit -> make sure that item has appropriate id keys.
		if(edit) {
			newItem["id"] = type === "deck" ? parseInt(deckId) : parseInt(cardId);

			if(type === "card") {
				newItem["deckId"] = parseInt(deckId);
			}
		}

		// call appropriate function
		const idx = edit ?
			(type === "deck" ? await editDeck(newItem) : await editCard(newItem)) :
			(type === "deck" ? await addDeck(newItem) : await addCard(newItem, deckId));

		// if new deck -> get id	
		if(!edit && type === "deck") {
			deckId = idx;
		}

		history.push(`/decks/${deckId}`);
	}

	return (
		<div id={`${type}-form-${mode}`}>
			<Breadcrumb 
				page={`${mode}-${type}`} 
				deckName={deck ? deck.name : null} 
				deckId={parseInt(deckId)} 
				cardId={cardId ? parseInt(cardId) : null}
			/>

			<h1>
				{type === "card" && `${deck.name}: `}
				{mode.charAt(0).toUpperCase() + mode.slice(1)}&nbsp;
				{type.charAt(0).toUpperCase() + type.slice(1)}&nbsp;
			</h1>

			<form onSubmit={handleSubmit}>
				<FormArea
					keys={keys}
					idx={0}
					handleChange={handleChange}
					formData={formData}
				/>

				<FormArea
					keys={keys}
					idx={1}
					handleChange={handleChange}
					formData={formData}
				/>

				<a href="/">
					<button className="btn btn-secondary mr-1" type="button">Cancel</button>
				</a>

				<button className="btn btn-primary mr-1" type="submit">Submit</button>

			</form>
		</div>
	);
}

Form.propTypes = {
	type: PropTypes.oneOf(["deck", "card"]).isRequired, 
	edit: PropTypes.bool.isRequired, 
	addDeck: PropTypes.func,
	addCard: PropTypes.func, 
	editDeck: PropTypes.func, 
	editCard: PropTypes.func,
	abortController: PropTypes.instanceOf(AbortController).isRequired
};

export default Form;