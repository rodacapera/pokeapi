import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { globalStyles } from '../theme/appTheme';
import { FadeInImage } from '../components/FadeInImage';
import { getPokemonInformation } from '../hooks/pokemonInformation';
import PokemonDetail from '../components/PokemonDetail';
import { RootStackParams } from '../types/globalTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import WaringModal from '../components/WaringModal';

interface Props extends StackScreenProps<RootStackParams, 'PokemonView'> {}

const PokemonView = ({ navigation, route }: Props) => {
	const { color, simplePokemon } = route.params;
	const { id, name, picture } = simplePokemon;
	const { isLoading, pokemonInformation } = getPokemonInformation(id);
	const [showRemovedModal, setShowRemovedModal] = useState(false);
	const [added, setAdded] = useState(false);
	const [removed, setRemoved] = useState(false);
	const [sumPokemonPoints, setSumPokemonPoints] = useState(0);
	const [teamPoints, setTeamPoints] = useState(0);
	const [warningPoints, setWarningPoints] = useState(false);
	const width = Dimensions.get('window').width;
	const myPoints = 3000;

	const getMyTeam = async () => {
		const team = await AsyncStorage.getItem('@storage_Key');
		return (team ? JSON.parse(team) : []) as SimplePokemon[];
	};

	const removePokemonHandle = async () => {
		const team = await getMyTeam();
		const newPoints = teamPoints - sumPokemonPoints;
		team[0].teamPoints = newPoints;
		const teamFiltered = team.filter(value => value.name !== simplePokemon.name);
		await AsyncStorage.setItem('@storage_Key', JSON.stringify(teamFiltered));
		setAdded(false);
		setRemoved(false);
		setShowRemovedModal(true);
		setTeamPoints(newPoints);
	};

	// const isDuplicated = async () => {
	// 	const team = await getMyTeam();
	// 	const isIn = team.findIndex(t => t.name === simplePokemon.name);
	// 	const newTeam = [...team, simplePokemon];
	// 	const teamFiltered = newTeam.filter((value, index, self) => {
	// 		return index === self.findIndex(t => t.name === value.name);
	// 	});
	// 	await AsyncStorage.setItem('@storage_Key', JSON.stringify(teamFiltered));
	// };

	const addPokemonHandle = async () => {
		const team = await getMyTeam();
		if (team.length > 0) {
			const actualPoints = team[0].teamPoints! + sumPokemonPoints;
			if (actualPoints <= myPoints) {
				team[0].teamPoints = actualPoints;
				await AsyncStorage.setItem(
					'@storage_Key',
					JSON.stringify([...team, { detail: pokemonInformation, color, ...simplePokemon, teamPoints: actualPoints }])
				);
				setTeamPoints(actualPoints);
				setAdded(true);
				setRemoved(true);
				setWarningPoints(false);
			} else {
				setWarningPoints(true);
			}
		} else {
			const actualPoints = teamPoints + sumPokemonPoints;
			await AsyncStorage.setItem(
				'@storage_Key',
				JSON.stringify([{ detail: pokemonInformation, color, ...simplePokemon, teamPoints: actualPoints }])
			);
			setTeamPoints(actualPoints);
			setAdded(true);
			setRemoved(true);
			setWarningPoints(false);
		}
	};

	const isInTeam = async () => {
		const team = await getMyTeam();
		if (team.length > 0) {
			const isIn = team.findIndex(t => t.name === simplePokemon.name);
			isIn === -1 ? setRemoved(false) : setRemoved(true);
		} else {
			setRemoved(false);
		}
	};

	const createInitialTeam = async () => {
		// await AsyncStorage.clear();
		const team = await AsyncStorage.getItem('@storage_Key');
		if (!team) await AsyncStorage.setItem('@storage_Key', JSON.stringify([]));
		isInTeam();
	};

	useEffect(() => {
		createInitialTeam();
	}, []);

	useLayoutEffect(() => {
		if (added || showRemovedModal || warningPoints)
			setTimeout(() => {
				added && setAdded(false);
				showRemovedModal && setShowRemovedModal(false);
				warningPoints && setWarningPoints(false);
				navigation.goBack();
				// removed && setRemoved(false);
			}, 1500);
	}, [added, showRemovedModal, warningPoints]);
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					...styles.headerContainer,
					backgroundColor: color,
					height: Platform.OS === 'ios' ? 420 : 380,
					paddingTop: Platform.OS === 'ios' ? 80 : 60
				}}>
				<View style={{ ...globalStyles.contentRow, width: width * 0.6 }}>
					<Text
						style={{
							...styles.pokemonName,
							...globalStyles.capitalize,
							width: width,
							top: Platform.OS === 'ios' ? 20 : 0
						}}>
						{name + '\n'} # {id}
					</Text>
					<TouchableOpacity
						style={{ top: Platform.OS === 'ios' ? 20 : 5 }}
						onPress={removed ? removePokemonHandle : addPokemonHandle}>
						<View
							style={
								Platform.OS === 'ios'
									? { ...styles.containerAddButtonIos }
									: { ...styles.containerAddButtonAndroid, borderRadius: 100 }
							}>
							{removed ? (
								<Icon name="remove-circle-sharp" size={33} color="#cb0000" />
							) : (
								<Icon name="add-circle-outline" size={33} color="#8547ad" />
							)}
						</View>
					</TouchableOpacity>
				</View>
				{(added || showRemovedModal || warningPoints) && <WaringModal {...{ added, points: warningPoints }} />}
				<Image
					style={{ ...styles.pokeBall, bottom: Platform.OS === 'ios' ? -20 : 0 }}
					source={require('../assets/poke-ball-white.png')}
				/>

				<FadeInImage uri={picture} style={styles.pokemonImage} />
			</View>
			{isLoading ? (
				<View style={styles.loadingIndicator}>
					<ActivityIndicator color={color} size={50} />
				</View>
			) : (
				<PokemonDetail pokemon={pokemonInformation} pokemonPoints={setSumPokemonPoints} />
			)}
			{/* <Text>{sumPokemonPoints}</Text> */}
		</View>
	);
};

export default PokemonView;

const styles = StyleSheet.create({
	headerContainer: {
		zIndex: 999,
		alignContent: 'center',
		alignItems: 'center',
		borderBottomRightRadius: 1000,
		borderBottomLeftRadius: 1000
	},
	pokemonName: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
		paddingLeft: 20
	},
	pokeBall: {
		width: 250,
		height: 250,
		opacity: 0.7
	},
	pokemonImage: {
		width: 250,
		height: 250,
		position: 'absolute',
		bottom: -15
	},
	loadingIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerAddButtonIos: {
		top: Platform.OS === 'ios' ? 2 : 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowOpacity: 0.43,
		shadowRadius: 9.51,

		elevation: 15
	},
	containerAddButtonAndroid: {
		top: Platform.OS === 'ios' ? 2 : 3,
		shadowOffset: { width: 10, height: 20 },
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOpacity: 1,
		elevation: 3
	}
});
