import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface PropsWarning {
	repeated?: boolean;
	added: boolean;
	points: boolean;
}
const { width, height } = Dimensions.get('window');
const WaringModal = ({ repeated, added, points }: PropsWarning) => {
	return (
		<View style={styles.containerModal}>
			<View style={styles.warningCard}>
				<View style={styles.containerPikachu}>
					{added || !points ? (
						<Image style={styles.pikachu} source={require('../assets/pikachuLike.jpeg')} />
					) : (
						(!added || points) && <Image style={styles.pikachu} source={require('../assets/pikachuUnLike.webp')} />
					)}
				</View>
				<View style={styles.contentCard}>
					<View>
						{repeated ? (
							<Text style={{ ...styles.warningText, width: 150 }}>
								This Pokemon is in your Team, you don't have added it!
							</Text>
						) : (
							<Text style={{ ...styles.warningText }}>
								{`${
									points
										? 'Your points have been exceeded'
										: `The pokemon was ${added ? 'added in' : 'removed of'} your Team!`
								}`}
							</Text>
						)}
					</View>
				</View>
			</View>
		</View>
	);
};

export default WaringModal;

const styles = StyleSheet.create({
	containerModal: {
		top: 0,
		width: width,
		height: height,
		backgroundColor: 'rgba(255,255,255,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 999999999
	},
	warningText: {
		color: '#ff4200',
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 18
	},
	contentCard: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 0,
		width: 250,
		height: 130
	},
	warningCard: {
		width: 250,
		height: 130,
		// position: 'absolute',
		bottom: Platform.OS === 'ios' ? 0 : 0,
		zIndex: 9999,
		borderRadius: 10,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowOpacity: 0.43,
		shadowRadius: 9.51,

		elevation: 15
	},
	pikachu: {
		width: 80,
		height: 80,
		borderRadius: 100
	},
	containerPikachu: {
		position: 'absolute',
		top: -40,
		width: 250,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowOpacity: 0.43,
		shadowRadius: 9.51,

		elevation: 15
	}
});
