import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { globalStyles } from '../theme/appTheme';
import { FadeInImage } from './FadeInImage';
import CharacteristicsByTypes from './CharacteristicsByTypes';

interface Props {
	pokemon: PokemonFull;
	pokemonPoints: (points: number) => void;
}

const PokemonDetail = ({ pokemon, pokemonPoints }: Props) => {
	const { characteristics, regions } = pokemon;

	return (
		<ScrollView style={{ ...StyleSheet.absoluteFillObject, marginTop: 50 }}>
			<View>
				<CharacteristicsByTypes
					props={{ keyType: 'types', title: 'types' }}
					pokemon={pokemon}
					pokemonPoints={pokemonPoints}
				/>
				<View style={{ ...globalStyles.marginHorizontal }}>
					<Text style={styles.title}>Weight</Text>
					<Text style={styles.regularText}>{pokemon.weight}Kg</Text>
				</View>
				<View style={{ ...globalStyles.marginHorizontal }}>
					<Text style={styles.title}>Generation</Text>
					<Text style={styles.regularText}>{characteristics.generation.name}</Text>
				</View>
				<View style={{ ...globalStyles.marginHorizontal }}>
					<Text style={styles.title}>Regions</Text>
					{regions.length > 0 ? (
						regions.map(({ name }, index) => {
							return (
								<View key={index}>
									<Text style={styles.regularText}>{name}</Text>
								</View>
							);
						})
					) : (
						<Text>Not register</Text>
					)}
				</View>
			</View>
			<View style={{ ...globalStyles.marginHorizontal }}>
				<Text style={styles.title}>Sprites</Text>
			</View>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
				<FadeInImage style={styles.basicSprites} uri={pokemon.sprites.front_default} />
				<FadeInImage style={styles.basicSprites} uri={pokemon.sprites.back_default} />
				<FadeInImage style={styles.basicSprites} uri={pokemon.sprites.front_shiny} />
				<FadeInImage style={styles.basicSprites} uri={pokemon.sprites.back_shiny} />
			</ScrollView>
			<CharacteristicsByTypes
				props={{ keyType: 'abilities', title: 'Base Abilities' }}
				pokemon={pokemon}
				pokemonPoints={pokemonPoints}
			/>
			<CharacteristicsByTypes
				props={{ keyType: 'moves', title: 'Moves' }}
				pokemon={pokemon}
				pokemonPoints={pokemonPoints}
			/>
			<CharacteristicsByTypes
				props={{ keyType: 'stats', title: 'Stats' }}
				pokemon={pokemon}
				pokemonPoints={pokemonPoints}
			/>
			<View style={styles.spriteCenter}>
				<FadeInImage style={styles.basicSprites} uri={pokemon.sprites.front_default} />
			</View>
		</ScrollView>
	);
};

export default PokemonDetail;

const styles = StyleSheet.create({
	dataContainer: {
		flexDirection: 'row'
	},
	title: {
		color: 'black',
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 20
	},
	regularText: {
		color: 'black',
		fontSize: 19
	},
	basicSprites: {
		width: 100,
		height: 100
	},
	spriteCenter: {
		marginBottom: 80,
		alignItems: 'center'
	}
});
