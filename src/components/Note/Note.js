import React, { useContext } from 'react';
import contextValue from '../../Context API/Context';
import M from 'materialize-css/dist/js/materialize.min.js'
const axios = require('axios').default;

const Note = ({ note }) => {
	const context = useContext(contextValue);
	const deleteNote = async () => {
		const resault = await axios.delete(
			`https://mern-backend.herokuapp.com/notes/${note._id}`
		);
		M.toast({html:resault.data});

		context.getNotes();
	};
	const checkLevel = () => {
		if (note.importance === 'Urgent')
			return {
				color: 'material-icons red-text',
				icon: '	error_outline',
				border: 'collapsible-header bg-urgent'
			};
		if (note.importance === 'Important')
			return {
				color: 'material-icons green-text',
				icon: 'event',
				border: 'collapsible-header bg-important'
			};

		return {
			color: 'material-icons blue-text',
			icon: 'add_circle_outline',
			border: 'collapsible-header bg-regular'
		};
	};

	return (
		<li>
			<div className={checkLevel().border}>
				{note.noteName}

				<i onClick={deleteNote} className='material-icons black-text'>
					delete
				</i>
			</div>
			<div className='collapsible-body'>
				<span style={{ fontSize: '1.5rem' }}>
					<i
						className={checkLevel().color}
						style={{ fontSize: '1.5rem', marginRight: '10px ' }}>
						{checkLevel().icon}
					</i>
					{note.noteText}
				</span>
			</div>
		</li>
	);
};

export default Note;

