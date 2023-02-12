import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeView from '../views/HomeView';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchView from '../views/SearchView';
import PokemonTeamView from '../views/PokemonTeamView';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: 'white'
			}}
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: 'black',
				tabBarIconStyle: {
					marginTop: 5
				},
				tabBarStyle: {
					position: 'absolute',
					backgroundColor: 'rgba(255,255,255,0.89)',
					borderWidth: 0,
					elevation: 0
				}
			}}>
			<Tab.Screen
				name="HomeView"
				options={{
					title: 'List',
					// tabBarActiveTintColor: 'black',
					// headerTitleStyle: {color: 'black'},
					tabBarIcon: ({ size }) => <Icon name="list-outline" size={size} />
				}}
				component={HomeView}
			/>
			<Tab.Screen
				name="SearchView"
				options={{
					title: 'SearchView',
					tabBarActiveTintColor: 'black',
					headerTitleStyle: { color: 'black' },
					tabBarIcon: ({ size }) => <Icon name="search-outline" size={size} />
				}}
				component={SearchView}
			/>
			<Tab.Screen
				name="PokemonTeamView"
				options={{
					title: 'Team',
					tabBarActiveTintColor: 'black',
					headerTitleStyle: { color: 'black' },
					tabBarIcon: ({ size }) => <Icon name="people-outline" size={size} />
				}}
				component={PokemonTeamView}
			/>
		</Tab.Navigator>
	);
};

export default TabsNavigator;

const styles = StyleSheet.create({});
