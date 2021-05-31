import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrawerContent from './views/layout/DrawerContent';
import Register from './views/register';
import HomeScreen from './views/home';
import Recipes from './views/recipes';
import Sabores from './views/sabores';
import Postres from './views/postres';
import Perfil from './components/category/auth/Perfil';
import {StyleSheet} from 'react-native';
import Store from './core';

const Drawer = createDrawerNavigator();

const App = ({navigation}) => {
  return (
    <Store>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={styles.drawerStyles}
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="Recipes" component={Recipes} />
            <Drawer.Screen name="Sabores" component={Sabores} />
            <Drawer.Screen name="Postres" component={Postres} />
            <Drawer.Screen
              name="Perfil"
              component={Perfil}
              navigation={navigation}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Store>
  );
};
const styles = StyleSheet.create({
  drawerStyles: {width: '84%'},
});
export default App;
