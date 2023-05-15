import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Vote Languages</Link>
				</li>
				<li>
					<Link to="/sentiment">Send Sentiments</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
