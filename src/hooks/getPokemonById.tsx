import {useRef, useEffect, useState} from 'react';
import {getPokemonApi} from '../api/pokemonApi';
import {PaginatePokemonResponse, Results, SimplePokemon} from '../interfaces/pokemonInterfaces';

export const getPokemonById = () => {
	const [simplePokemon, setSimplePokemon] = useState<SimplePokemon[]>([]);
	const [isFetching, setIsFetching] = useState(false);

	const loadPokemon = async () => {
		setIsFetching(true);
		const result = await getPokemonApi.get<PaginatePokemonResponse>(
			'https://pokeapi.co/api/v2/pokemon?limit=1200',
		);
		mapPokemonList(result.data.results);
	};

	const mapPokemonList = (pokemonList: Results[]) => {
		const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
			const urlArray = url.split('/');
			const id = urlArray[urlArray.length - 2];
			const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
			return {id, picture, name};
		});
		setSimplePokemon(newPokemonList);
		setIsFetching(false);
	};

	useEffect(() => {
		loadPokemon();
	}, []);

	return {isFetching, simplePokemon};
};
