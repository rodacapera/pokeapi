import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, Platform} from 'react-native';
import Loading from '../components/Loading';
import PokemonCards from '../components/PokemonCards';
import SearchInput from '../components/SearchInput';
import {getPokemonByName} from '../hooks/getPokemonByName';
import {globalStyles} from '../theme/appTheme';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

const SearchView = () => {
	const {isFetching, simplePokemon} = getPokemonByName();
	const [term, setTerm] = useState('');
	const [filteredPokemon, setFilteredPokemon] = useState<SimplePokemon[]>([]);

	useEffect(() => {
		if (term.length === 0) {
			return setFilteredPokemon([]);
		}
		if (isNaN(Number(term))) {
			setFilteredPokemon(
				simplePokemon.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())),
			);
		} else {
			const pokemonById = simplePokemon.find(pokemon => pokemon.id === term);
			setFilteredPokemon(pokemonById ? [pokemonById] : []);
		}
	}, [term]);

	if (isFetching) {
		return <Loading />;
	}
	const EmptyResult = () => {
		return (
			<View style={{marginTop: 150}}>
				<Text>No results found...</Text>
			</View>
		);
	};

	const listHeader = (
		<View style={{marginTop: Platform.OS === 'ios' ? 90 : 50, alignItems: 'center'}}>
			<SearchInput onDebounced={value => setTerm(value)} />
			<Text
				style={{
					...globalStyles.titlePage,
					...globalStyles.marginHorizontal,
					...globalStyles.marginVertical,
				}}>
				{term}
			</Text>
			{filteredPokemon.length <= 0 && <EmptyResult />}
		</View>
	);

	return (
		<View>
			<View style={{alignItems: 'center'}}>
				<FlatList
					data={filteredPokemon}
					showsHorizontalScrollIndicator={false}
					numColumns={2}
					ListHeaderComponent={listHeader}
					keyExtractor={pokemon => pokemon.id}
					renderItem={({item}) => <PokemonCards pokemon={item} />}
				/>
			</View>
		</View>
	);
};

export default SearchView;

const styles = StyleSheet.create({});
