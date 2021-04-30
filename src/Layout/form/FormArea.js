import React from "react";
import PropTypes from "prop-types";

/**
 * A FormArea component displays a text area for a <form>.
 * @param {ComponentProps} props - Properties passed in for the component.
 * @param {Array<string>} props.keys - Form area ids.
 * @param {number} props.idx - Either 0 or 1.
 * @param {function} props.handleChange - Handles changes made by user when called.
 * @param {formData} props.formData - The current values of the form.
 * @returns {ReactElement} JSX for a FormArea component.
 */
function FormArea({ keys, idx, handleChange, formData }) {
	return (
		<div id={keys[idx]}>
			<label htmlFor={keys[idx]}>
				{keys[idx].charAt(0).toUpperCase() + keys[idx].slice(1)}
			</label>

			<br />

		{keys[idx] === "name" ?
			<input
				name="name"
				id="name"
				type="text"
				onChange={handleChange}
				value={formData[keys[idx]]}
				style={{ width: "100%" }}
			/> :
			<textarea
				name={keys[idx]}
				id={keys[idx]}
				onChange={handleChange}
				value={formData[keys[idx]]}
				style={{ width: "100%" }}
				rows="4"
			/>
		}
		</div>
	);
}

FormArea.propTypes = {
	keys: PropTypes.arrayOf(PropTypes.string).isRequired,
	idx: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
	formData: PropTypes.object.isRequired,
};

export default FormArea;