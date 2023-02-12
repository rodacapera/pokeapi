import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { globalStyles } from '../theme/appTheme';
import { PokemonFull, SimplePokemon } from '../interfaces/pokemonInterfaces';

interface Characteristics {
	props: Data;
	pokemon: PokemonFull;
	pokemonPoints: (points: number) => void;
}

interface Data {
	keyType: string;
	title: string;
}

type Params = {
	params: {
		name: string | number;
		bold?: boolean;
		index: number;
		keyType: string;
		number?: boolean;
		count?: number;
	};
};

const CharacteristicsByTypes = ({ props, pokemon, pokemonPoints }: Characteristics) => {
	const { types, abilities, moves, stats, characteristics } = pokemon;
	const { keyType, title } = props;
	const [loadTotal, setLoadTotal] = useState(false);
	let sum = useRef(0);
	const marginTop = keyType === 'types' ? (Platform.OS === 'ios' ? 370 : 300) : 0;

	const TextContent = ({ params }: Params) => {
		const { name, bold, index, keyType, number, count } = params;
		if (keyType === 'stats' && number) {
			!loadTotal && (sum.current += Number(name));
			if (count === index + 1)
				setTimeout(() => {
					setLoadTotal(true);
					pokemonPoints(sum.current);
				}, 500);
		}

		return (
			<View>
				<Text
					style={{
						...styles.regularText,
						marginRight: 10,
						width: keyType === 'stats' ? (number ? 50 : 150) : 'auto',
						fontWeight: bold ? 'bold' : 'normal',
						textAlign: keyType === 'stats' && number ? 'right' : 'left'
					}}
					key={name + `${index}`}>
					{name}
				</Text>

				{keyType === 'stats' && number && index + 1 === count && (
					<Text
						style={{
							...styles.regularText,
							width: keyType === 'stats' ? (number ? 50 : 150) : 'auto',
							textAlign: 'right',
							fontWeight: bold ? 'bold' : 'normal'
						}}>
						{sum.current}
					</Text>
				)}
			</View>
		);
	};
	return (
		<View
			style={{
				...globalStyles.marginHorizontal,
				marginTop: marginTop
			}}
			key={keyType}>
			<Text style={{ ...styles.title, ...globalStyles.capitalize }}>{title}</Text>
			<View
				style={{
					flexDirection: `${keyType === 'stats' ? 'column' : 'row'}`,
					flexWrap: `${keyType === 'moves' ? 'wrap' : 'nowrap'}`
				}}>
				{keyType === 'types'
					? types.map((value, index) => {
							return (
								<TextContent params={{ name: value.type.name, index, keyType }} key={value.type.name + `${index}`} />
							);
					  })
					: keyType === 'abilities'
					? abilities.map((value, index) => {
							return (
								<TextContent
									params={{ name: value.ability.name, index, keyType }}
									key={value.ability.name + `${index}`}
								/>
							);
					  })
					: keyType === 'moves'
					? moves.map((value, index) => {
							return (
								<TextContent params={{ name: value.move.name, index, keyType }} key={value.move.name + `${index}`} />
							);
					  })
					: stats.map((value, index) => {
							const length = stats.length;
							return (
								<View style={{ flexDirection: 'row' }} key={index}>
									<View>
										<TextContent params={{ name: value.stat.name, index, keyType }} />
										{length === index + 1 && <Text style={{ ...styles.regularText, fontWeight: '600' }}>Total</Text>}
									</View>

									<TextContent
										params={{
											name: value.base_stat,
											bold: true,
											index,
											keyType,
											number: true,
											count: length
										}}
									/>
								</View>
							);
					  })}
			</View>
		</View>
	);
};

export default CharacteristicsByTypes;

const styles = StyleSheet.create({
	title: {
		color: 'black',
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 20
	},
	regularText: {
		color: 'black',
		fontSize: 19
	}
});
