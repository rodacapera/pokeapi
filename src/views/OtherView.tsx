import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const OtherView = () => {
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
		});
	}, []);
	return (
		<View>
			<Text>OtherView</Text>
		</View>
	);
};

export default OtherView;

const styles = StyleSheet.create({});
