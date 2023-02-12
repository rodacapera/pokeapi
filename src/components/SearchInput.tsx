import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../theme/appTheme';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {debouncedValue} from '../hooks/debouncedValue';

interface Props {
	onDebounced: (value: string) => void;
}

const SearchInput = ({onDebounced}: Props) => {
	const [textValue, setTextValue] = useState('');
	const value = debouncedValue(textValue);
	const width = Dimensions.get('window').width;

	useEffect(() => {
		onDebounced(value);
	}, [value]);

	return (
		<View style={{...globalStyles.marginHorizontal, ...styles.container, width: width * 0.8}}>
			<View style={styles.textSearch}>
				<TextInput
					style={{...styles.textInput, top: Platform.OS === 'android' ? 2 : 0}}
					placeholder="Find your Pokemon"
					autoCapitalize="none"
					autoCorrect={false}
					value={textValue}
					onChangeText={setTextValue}
				/>
				<Icon name="search-outline" size={28} color={'grey'} />
			</View>
		</View>
	);
};

export default SearchInput;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
	},
	textSearch: {
		backgroundColor: '#d0e5f7',
		borderRadius: 50,
		height: 40,
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	textInput: {
		flex: 1,
		fontSize: 18,
	},
});
