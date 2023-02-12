import { StyleSheet, Platform } from 'react-native';

const globalStyles = StyleSheet.create({
	marginHorizontal: {
		marginHorizontal: 20
	},
	marginVertical: {
		marginVertical: 20
	},
	capitalize: {
		textTransform: 'capitalize'
	},
	title: {
		color: 'black',
		fontSize: 30,
		fontWeight: 'bold'
	},
	titlePage: {
		color: 'black',
		fontSize: 30,
		fontWeight: 'bold'
	},
	subtitle: {
		fontSize: 20
	},
	textBold: {
		fontWeight: 'bold'
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	texButton: {
		textTransform: 'capitalize',
		fontSize: 16,
		color: 'white',
		textAlign: 'center'
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0)'
	},
	headerIcon: {
		position: 'absolute',
		left: 10,
		top: 10
	},
	headerTitle: {
		flex: 1,
		alignItems: 'center'
	},
	pokeBall: {
		position: 'absolute',
		width: 300,
		height: 300,
		opacity: 0.2
	},
	activityIndicator: {
		height: 100
	},
	photoPokemon: {
		width: 100,
		height: 100
	},
	contentRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginHorizontal: 20,
		paddingRight: 20
	}
});

const pokemonCards = StyleSheet.create({
	cardContainer: {
		marginHorizontal: 10,
		height: 120,
		width: 160,
		marginBottom: 25,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
		// overflow: 'hidden',
	},
	name: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		top: 20,
		left: 10
	},
	pokeBallWhite: {
		width: 100,
		height: 100,
		position: 'absolute',
		bottom: -20,
		right: -20
		// opacity: 0.5,
	},
	pokemonImage: {
		width: 120,
		height: 120,
		position: 'absolute',
		right: -8,
		bottom: -5
	},
	pokeBallContainer: {
		width: 100,
		height: 100,
		position: 'absolute',
		bottom: 0,
		right: 0,
		overflow: 'hidden',
		opacity: 0.5
	}
});

const drawerStyles = StyleSheet.create({
	contentCenterImage: {
		marginTop: Platform.OS === 'ios' ? 0 : 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	drawerImage: {
		width: 150,
		height: 150,
		borderRadius: 50
	},
	drawerContent: {
		marginHorizontal: 30,
		marginVertical: 50
	},
	drawerButton: {
		marginVertical: 10
	},
	drawerText: {
		fontSize: 20
	}
});

export { globalStyles, drawerStyles, pokemonCards };
