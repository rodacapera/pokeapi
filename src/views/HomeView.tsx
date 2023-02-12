import React from 'react';
import { ActivityIndicator, FlatList, Image, Platform, Text, View } from 'react-native';
import { globalStyles } from '../theme/appTheme';
import { getPokemon } from '../hooks/getPokemon';
import PokemonCards from '../components/PokemonCards';

const HomeView = () => {
	const { simplePokemon, loadPokemon } = getPokemon();

	const ListHeader = () => {
		return (
			<Text
				style={{
					...globalStyles.titlePage,
					...globalStyles.marginHorizontal,
					...globalStyles.marginVertical,
					marginTop: Platform.OS === 'ios' ? 50 : 5,
					textAlign: 'center'
				}}>
				Pokemon
			</Text>
		);
	};

	return (
		<View>
			<Image source={require('../assets/pokeBall.png')} style={{ ...globalStyles.pokeBall }} />
			<View style={{ alignItems: 'center' }}>
				<FlatList
					data={simplePokemon}
					showsHorizontalScrollIndicator={false}
					numColumns={2}
					ListHeaderComponent={<ListHeader />}
					keyExtractor={pokemon => pokemon.id}
					renderItem={({ item }) => <PokemonCards pokemon={item} />}
					onEndReached={loadPokemon}
					onEndReachedThreshold={0.4}
					ListFooterComponent={<ActivityIndicator style={globalStyles.activityIndicator} size={20} color="grey" />}
				/>
			</View>
		</View>
	);
};

export default HomeView;
