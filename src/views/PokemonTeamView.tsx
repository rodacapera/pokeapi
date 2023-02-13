import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Platform, FlatList } from 'react-native';
import { globalStyles } from '../theme/appTheme';
import { FadeInImage } from '../components/FadeInImage';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonCards from '../components/PokemonCards';
import { useIsFocused } from '@react-navigation/native';

interface Averages {
	name: string;
	value: number;
	average: number;
}

interface TempRegions {
	name: string;
}

const PokemonTeamView = () => {
	const [team, setTeam] = useState<SimplePokemon[]>([]);
	const width = Dimensions.get('window').width;
	const [averagesPokemon, setAveragesPokemon] = useState<Averages[]>([]);
	const [regionsPokemon, setRegionsPokemon] = useState<TempRegions[]>([]);
	const [count, setCount] = useState(0);
	const [total, setTotal] = useState(0);
	const isFocused = useIsFocused();
	// const getMyTeam = async () => {
	// 	const currentTeam = await AsyncStorage.getItem('@storage_Key');
	// 	const myTeam: SimplePokemon[] = currentTeam ? JSON.parse(currentTeam) : [];

	// };
	const getMyTeam = async () => {
		const team = await AsyncStorage.getItem('@storage_Key');
		if (team) {
			const teamParsed = JSON.parse(team);
			const teamReturn: SimplePokemon[] = teamParsed;
			setTeam(teamReturn);
			statsAverages(teamReturn);
		}
	};

	const statsAverages = (myTeam: SimplePokemon[]) => {
		const temp: Averages[] = [];
		const tempRegions: TempRegions[] = [];
		let counter = 0;
		let subTotal = 0;
		if (team.length === 0 || team.length != myTeam.length) {
			myTeam.map(({ detail }, teamIndex) => {
				if (detail) {
					detail.stats.map(({ stat, base_stat }, index) => {
						const name = stat.name;
						if (teamIndex > 0 && temp.length > 0) {
							const newIndex = temp.findIndex(value => value.name === stat.name);
							if (temp[newIndex].name === stat.name) {
								temp[newIndex].value += base_stat;
								if (myTeam.length === teamIndex + 1) {
									temp[newIndex].average += temp[newIndex].value / myTeam.length;
								}
								subTotal += subTotal + temp[newIndex].value;
								counter++;
							}
						} else {
							temp.push({ name: name, value: base_stat, average: 0 });
						}
					});
					detail.regions.map(({ name, url }) => {
						const regionName = name;
						const urRegion = url;
						tempRegions.push({ name: name });
					});
				}
			});
			const teamFiltered = tempRegions.filter((value, index, self) => {
				return index === self.findIndex(t => t.name === value.name);
			});
			setTotal(subTotal);
			setCount(counter);
			setAveragesPokemon(temp);
			setRegionsPokemon(teamFiltered);
		}
	};

	const EmptyResult = () => {
		return (
			<View style={{ marginTop: 150 }}>
				<Text>No results found...</Text>
			</View>
		);
	};

	const ListHeader = () => {
		return (
			<View style={{ marginTop: Platform.OS === 'ios' ? 270 : 260, alignItems: 'center' }}>
				{averagesPokemon.length > 0 && (
					<Text
						style={{
							...globalStyles.titlePage,
							...globalStyles.marginHorizontal
						}}>
						Team Average
					</Text>
				)}

				{averagesPokemon.length > 0 && (
					<View style={{ width: 270, marginVertical: 30 }}>
						<View style={{ alignItems: 'center' }}>
							<View style={{ flexDirection: 'row', marginBottom: 8 }}>
								<Text style={{ ...styles.headerTable, width: 130 }}>Stat</Text>
								<Text style={{ ...styles.headerTable, width: 65 }}>Value</Text>
								<Text style={{ ...styles.headerTable, width: 80 }}>Average</Text>
							</View>
							<View style={{ width: 270, alignItems: 'center' }}>
								{averagesPokemon.map(({ name, value, average }, index) => {
									return (
										<View style={{ flexDirection: 'row' }} key={index}>
											<Text style={{ ...styles.contentTable, width: 130, textAlign: 'left' }}>{name}</Text>
											<Text style={{ ...styles.contentTable, width: 65, textAlign: 'center' }}>{value}</Text>
											<Text style={{ ...styles.contentTable, width: 80, textAlign: 'center' }}>
												{average.toFixed(2)}
											</Text>
										</View>
									);
								})}
							</View>
						</View>
					</View>
				)}
				{regionsPokemon.length > 0 && (
					<View style={{ width: width * 0.85, marginBottom: 20 }}>
						<Text
							style={{
								...globalStyles.title
							}}>
							Regions
						</Text>
						<View style={{ flexDirection: 'row' }}>
							{regionsPokemon.map(({ name }, index) => {
								return (
									<Text key={index}>
										{name} {regionsPokemon.length === index + 1 ? '' : '/'}
									</Text>
								);
							})}
						</View>
					</View>
				)}
				{team.length <= 0 && <EmptyResult />}
			</View>
		);
	};

	useEffect(() => {
		getMyTeam();
		// statsAverages();
	}, [isFocused]);

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					...styles.headerContainer,
					backgroundColor: '#1e8dd8',
					justifyContent: 'center',
					height: Platform.OS === 'ios' ? 320 : 300,
					paddingTop: Platform.OS === 'ios' ? 80 : 60
				}}>
				<View style={{ ...globalStyles.contentRow, width: width * 0.6 }}>
					<Text
						style={{
							...styles.pokemonName,
							...globalStyles.capitalize,
							top: Platform.OS === 'ios' ? -45 : -65
						}}>
						My Team
					</Text>
				</View>

				<Image
					style={{ ...styles.pokeBall, bottom: Platform.OS === 'ios' ? -20 : 0 }}
					source={require('../assets/poke-ball-white.png')}
				/>

				<FadeInImage imageSource={require('../assets/pokemonTeam.png')} style={styles.pokemonTeam} />
			</View>

			<View style={{ ...StyleSheet.absoluteFillObject, top: 50 }}>
				<View style={{ alignItems: 'center' }}>
					<FlatList
						data={team}
						showsHorizontalScrollIndicator={false}
						numColumns={2}
						ListHeaderComponent={<ListHeader />}
						keyExtractor={pokemon => pokemon.id}
						renderItem={({ item }) => <PokemonCards pokemon={item} />}
						onEndReached={getMyTeam}
						onEndReachedThreshold={0.4}
						ListFooterComponent={<View style={{ marginBottom: 90 }}></View>}
					/>
				</View>
			</View>
		</View>
	);
};

export default PokemonTeamView;

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
		textAlign: 'center'
	},
	pokeBall: {
		top: -20,
		width: 170,
		height: 170,
		opacity: 0.7
	},
	pokemonImage: {
		width: 250,
		height: 250,
		position: 'absolute',
		bottom: -15
	},
	pokemonTeam: {
		position: 'absolute',
		width: 200,
		height: 180,
		bottom: 0
	},
	loadingIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerTable: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '700',
		color: 'black'
	},
	contentTable: {
		fontSize: 16,
		fontWeight: '500',
		color: 'black'
	}
});
