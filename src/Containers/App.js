import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import ErrorBoundry from '../Components/ErrorBoundry';
import Scroll from '../Components/Scroll';

import { setSearchField, requestRobots } from '../actions';

function App({store}) {
	const searchField = useSelector(state => state.searchRobots.searchField)
	const robots = useSelector(state => state.requestRobots.robots);
	const isPending = useSelector(state => state.requestRobots.isPending);
	const error = useSelector(state => state.requestRobots.error);
	
	const dispatch = useDispatch();
	const onSearchChange = (e) => dispatch(setSearchField(e.target.value))
	const onRequestRobots = () => dispatch(requestRobots())
	// const [robots, setRobots] = useState([]);

	useEffect(() => {
		onRequestRobots()
	}, [])

	const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})

	if (isPending) {
		return <h1>Loading...</h1>
	} else {
		return (
			<div className="tc">
				<h1>RoboFriends</h1>
				<SearchBox searchChange={ onSearchChange } />
				<Scroll>
					<ErrorBoundry>
						<CardList robots={ filteredRobots }/>
					</ErrorBoundry>
				</Scroll>
			</div>
		)
	}		
}

export default App;