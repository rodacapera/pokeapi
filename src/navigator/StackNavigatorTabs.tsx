// In App.js in a new project

import * as React from 'react';

import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import TabsNavigator from './TabsNavigator';
import { RootStackParams } from '../types/globalTypes';
import PokemonView from '../views/PokemonView';
import PokemonTeamView from '../views/PokemonTeamView';

const Stack = createNativeStackNavigator<RootStackParams>();

interface Props {
	children?: string;
	tintColor?: string;
	title: string;
	navigation: UniversalScreenNavigationProp;
}

export type UniversalScreenNavigationProp = NativeStackNavigationProp<RootStackParams>;

const StackNavigatorTabs = () => {
	const HeaderTitle = (props: Props) => {
		const { title, navigation } = props;
		return (
			<View style={globalStyles.header}>
				<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
					<Icon name="menu" size={28} color={'black'} />
				</TouchableOpacity>
				<View style={globalStyles.headerTitle}>{/* <Text style={globalStyles.title}>{title}</Text> */}</View>
			</View>
		);
	};
	return (
		<Stack.Navigator
			initialRouteName="TabsNavigator"
			screenOptions={{
				statusBarColor: 'black',
				headerTintColor: 'black',
				// customAnimationOnGesture: true,
				animation: 'slide_from_right',
				// contentStyle: {
				// 	backgroundColor: 'red',
				// },
				headerStyle: {
					// backgroundColor: 'rgba(255,255,255,0)',
				},
				headerShown: true,
				headerTransparent: true,
				headerShadowVisible: false,
				// headerBlurEffect: 'light',
				headerTitleStyle: {
					fontSize: 30
				}
				// headerTitle: 'hola',
			}}>
			<Stack.Screen
				name="TabsNavigator"
				options={({ navigation }) => ({
					headerTitle: props => <HeaderTitle {...props} {...{ navigation: navigation }} {...{ title: 'Home' }} />
				})}
				component={TabsNavigator}
			/>
			<Stack.Screen name="PokemonView" component={PokemonView} />
			<Stack.Screen name="PokemonTeamView" component={PokemonTeamView} />
		</Stack.Navigator>
	);
};

export default StackNavigatorTabs;
