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
	const [pokemonPoints, setPokemonPoints] = useState(0);
	const [teamPoints, setTeamPoints] = useState(0);
	const [warningPoints, setWarningPoints] = useState(false);
	const [reset, setReset] = useState(false);
	const width = Dimensions.get('window').width;
	const myPoints = 3000;

	const getMyTeam = async () => {
		const team = await AsyncStorage.getItem('@storage_Key');
		if (team) {
			const teamParsed = JSON.parse(team);
			const teamReturn: SimplePokemon[] = teamParsed;
			return teamReturn;
		} else {
			return [];
		}
	};

	const removePokemonHandle = async () => {
		setShowRemovedModal(true);
		setAdded(false);
		setRemoved(false);
		const team = await getMyTeam();
		if (team && team.length > 0) {
			const newPoints = team[0].teamPoints! - pokemonPoints;
			team.map((teamValue, index) => {
				teamValue.teamPoints = newPoints;
			});
			const teamFiltered = team.filter(value => value.name !== simplePokemon.name);
			await AsyncStorage.setItem('@storage_Key', JSON.stringify(teamFiltered));
			setTeamPoints(newPoints);
		}
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
		setRemoved(true);

		const team = await getMyTeam();
		if (team.length > 0) {
			const actualPoints = team[0].teamPoints! + pokemonPoints;
			if (actualPoints <= myPoints) {
				team.map((teamValue, index) => {
					teamValue.teamPoints = actualPoints;
				});
				await AsyncStorage.setItem(
					'@storage_Key',
					JSON.stringify([...team, { detail: pokemonInformation, color, ...simplePokemon, teamPoints: actualPoints }])
				);
				setTeamPoints(actualPoints);
				setWarningPoints(false);
				setAdded(true);
			} else {
				setWarningPoints(true);
			}
		} else {
			const actualPoints = teamPoints + pokemonPoints;
			await AsyncStorage.setItem(
				'@storage_Key',
				JSON.stringify([{ detail: pokemonInformation, color, ...simplePokemon, teamPoints: actualPoints }])
			);
			setTeamPoints(actualPoints);
			setWarningPoints(false);
			setAdded(true);
		}
	};

	const isInTeam = async () => {
		const team = await getMyTeam();
		if (team.length > 0) {
			const isIn = team.findIndex(t => t.name === simplePokemon.name);
			if (isIn === -1) {
				setRemoved(false);
			} else {
				setRemoved(true);
			}
			const actualPoints = team[0].teamPoints;
			actualPoints && setTeamPoints(actualPoints);
		} else {
			setRemoved(false);
		}
	};

	const createInitialTeam = async () => {
		const team = await getMyTeam();
		isInTeam();
		if (!team) await AsyncStorage.setItem('@storage_Key', JSON.stringify([]));
	};

	const resetHandle = () => {
		setReset(true);
		setTimeout(() => {
			!reset && navigation.goBack();
			added && setAdded(false);
			showRemovedModal && setShowRemovedModal(false);
			warningPoints && setWarningPoints(false);
			setReset(false);
		}, 1500);
	};

	useEffect(() => {
		createInitialTeam();
	}, []);

	useEffect(() => {
		if (added || showRemovedModal || warningPoints) resetHandle();
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
					<View style={{ marginTop: 60, right: -50, position: 'absolute' }}>
						<Text style={{ fontSize: 19, fontWeight: '700', color: '#f0f7d3' }}>Team Points:</Text>
						<Text style={{ fontSize: 23, fontWeight: '700', color: 'black', textAlign: 'center' }}>{teamPoints}</Text>
					</View>
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
				<PokemonDetail pokemon={pokemonInformation} pokemonPoints={setPokemonPoints} />
			)}
			{/* <Text>{pokemonPoints}</Text> */}
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
