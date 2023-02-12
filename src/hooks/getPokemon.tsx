import { useRef, useEffect, useState } from 'react';
import { getPokemonApi } from '../api/pokemonApi';
import { PaginatePokemonResponse, Results, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const getPokemon = () => {
	const [simplePokemon, setSimplePokemon] = useState<SimplePokemon[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?ffset=20&limit=40');

	const loadPokemon = async () => {
		setIsLoading(true);
		const result = await getPokemonApi.get<PaginatePokemonResponse>(nextPageUrl.current);
		nextPageUrl.current = result.data.next;
		mapPokemonList(result.data.results);
	};

	const mapPokemonList = (pokemonList: Results[]) => {
		const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
			const urlArray = url.split('/');
			const id = urlArray[urlArray.length - 2];
			const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
			return { id, picture, name };
		});
		setSimplePokemon([...simplePokemon, ...newPokemonList]);
		setIsLoading(false);
	};

	useEffect(() => {
		loadPokemon();
	}, []);

	return { isLoading, simplePokemon, loadPokemon };
};
