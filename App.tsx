import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LateralDrawer} from './src/navigator/LateralDrawer';

function App(): JSX.Element {
	return (
		<NavigationContainer>
			<LateralDrawer />
		</NavigationContainer>
	);
}

export default App;
