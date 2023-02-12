import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from '../components/FadeInImage';
import { pokemonCards } from '../theme/appTheme';
import ImageColors from 'react-native-image-colors';
import { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

interface Props {
	pokemon: SimplePokemon;
}

type Nav = {
	navigate: (value: string, props: { simplePokemon: SimplePokemon; color: string }) => void;
};

const PokemonCards = ({ pokemon }: Props) => {
	const isMounted = useRef(true);
	const navigation = useNavigation<Nav>();
	const [bgColor, setBgColor] = useState('#19191a');
	const width = Dimensions.get('window').width;

	useEffect(() => {
		if (!isMounted) return;
		ImageColors.getColors(pokemon.picture, { fallback: '#19191a' }).then(colors => {
			switch (colors.platform) {
				case 'android':
					setBgColor(colors.dominant || '#19191a');
					break;
				case 'web':
					setBgColor(colors.lightVibrant || '#19191a');
					break;
				case 'ios':
					setBgColor(colors.background || '#19191a');
					break;
				default:
					throw new Error('Unexpected platform key');
			}
		});

		return () => {
			isMounted.current = false;
		};
	}, []);

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={() => navigation.navigate('PokemonView', { simplePokemon: pokemon, color: bgColor })}>
			<View style={{ ...pokemonCards.cardContainer, width: width * 0.4, backgroundColor: bgColor }}>
				<Text style={pokemonCards.name}>
					{pokemon.name}
					{'\n#' + pokemon.id}
				</Text>
				<View style={pokemonCards.pokeBallContainer}>
					<Image style={pokemonCards.pokeBallWhite} source={require('../assets/poke-ball-white.png')} />
				</View>
				<FadeInImage uri={pokemon.picture} style={pokemonCards.pokemonImage} />
			</View>
		</TouchableOpacity>
	);
};

export default PokemonCards;
