import { useState, useEffect } from 'react';
import { getPokemonApi } from '../api/pokemonApi';
import {
	Characteristics,
	LocationArea,
	LocationEncounters,
	LocationAreaElement,
	PokemonFull,
	Location,
	Region,
	LocationClass
} from '../interfaces/pokemonInterfaces';
export const getPokemonInformation = (id: string) => {
	const [isLoading, setIsLoading] = useState(true);
	const [pokemonInformation, setPokemonInformation] = useState<PokemonFull>({} as PokemonFull);
	const PATH = 'https://pokeapi.co/api/v2/';

	const loadPokemon = async () => {
		const pokemon = (await getPokemonApi.get<PokemonFull>(`${PATH}pokemon/${id}`)).data;
		const characteristics = (await getPokemonApi.get<Characteristics>(`${PATH}pokemon-species/${id}`)).data;
		const locationAreas = (await getPokemonApi.get<LocationEncounters[]>(`${PATH}pokemon/${id}/encounters`)).data;
		const regions: LocationAreaElement[] = await Promise.all(
			locationAreas.map(async ({ location_area }): Promise<LocationAreaElement> => {
				const location: LocationClass = (await getPokemonApi.get<LocationArea>(location_area.url)).data.location;
				const locationAreaUrl = location.url;
				const region: Region = (await getPokemonApi.get<Location>(locationAreaUrl)).data.region;
				return { ...region };
			})
		);
		const newRegions = regions.filter((value, index, self) => {
			const newIndex = self.findIndex(t => t.name === value.name);
			return index === newIndex;
		});
		setPokemonInformation({
			...pokemon,
			characteristics: characteristics,
			regions: newRegions
		});
		setIsLoading(false);
	};

	useEffect(() => {
		loadPokemon();
	}, []);

	return {
		isLoading,
		pokemonInformation
	};
};
