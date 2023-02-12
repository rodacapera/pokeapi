import {
	createDrawerNavigator,
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import StackNavigatorTabs from './StackNavigatorTabs';
import {Image, Linking, Text, useWindowDimensions, View} from 'react-native';
import {globalStyles, drawerStyles} from '../theme/appTheme';
import OtherView from '../views/OtherView';

const Drawer = createDrawerNavigator();

export const LateralDrawer = () => {
	const {width} = useWindowDimensions();
	return (
		<Drawer.Navigator
			screenOptions={{
				drawerType: width >= 768 ? 'permanent' : 'front',
				drawerActiveTintColor: 'black',
				headerTintColor: 'black',
				headerStyle: {
					borderWidth: 0,
					elevation: 0,
					shadowOpacity: 0,
				},
				headerShown: false, // this remove header
				drawerHideStatusBarOnOpen: true,
				// overlayColor: 'transparent',
			}}
			drawerContent={props => <DrawerComponent {...props} />}>
			<Drawer.Screen name="StackNavigatorTabs" options={{title: 'Home'}} component={StackNavigatorTabs} />
			<Drawer.Screen
				name="OtherView"
				options={{
					title: 'other',
				}}
				component={OtherView}
			/>
		</Drawer.Navigator>
	);
};

const DrawerComponent = (props: DrawerContentComponentProps) => {
	return (
		<DrawerContentScrollView {...props}>
			<View style={drawerStyles.contentCenterImage}>
				<Image
					source={{
						uri: 'https://pic.onlinewebfonts.com/svg/img_264157.png',
					}}
					style={drawerStyles.drawerImage}
				/>
				<View>
					<Text style={globalStyles.subtitle}>Welcome: </Text>
				</View>
			</View>
			<DrawerItemList {...props} />
			<DrawerItem label="Help" onPress={() => Linking.openURL('https://mywebsite.com/help')} />
		</DrawerContentScrollView>
	);
};
