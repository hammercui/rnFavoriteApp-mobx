/**
 * Created by Gaohan on 2017/5/22.
 */
import React from 'react';

import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Banner from './demoBanner';
import CustomTabs from './demoTabs';
import Drawer from './demoDrawer';
import ModalStack from './demoModal';
import SimpleStack from './demo2';
import SimpleTabs from './demo1';

const ExampleRoutes = {
  SimpleStack: {
    name: '普通页 demo2',
    description: 'A card stack',
    screen: SimpleStack,
  },
  SimpleTabs: {
    name: 'tab页 dome1',
    description: 'Tabs following platform conventions',
    screen: SimpleTabs,
  },
  Drawer: {
    name: 'Drawer',
    description: 'Android-style drawer navigation',
    screen: Drawer,
  },
  CustomTabs: {
    name: '自定义tab demoTabs',
    description: 'Custom tabs with tab router',
    screen: CustomTabs,
  },
  ModalStack: {
    name: Platform.OS === 'ios'
      ? 'Modal Stack Example'
      : 'Stack with Dynamic Header',
    description: Platform.OS === 'ios'
      ? 'Stack navigation with modals'
      : 'Dynamically showing and hiding the header',
    screen: ModalStack,
  },
  LinkStack: {
    name: '普通页 link demo2',
    description: 'deep link？',
    screen: SimpleStack,
    path: 'people/Jordan',
  },
  LinkTabs: {
    name: 'tab页 link demo1',
    description: 'tab标签',
    screen: SimpleTabs,
    path: 'settings',
  },
};

const MainScreen = ({ navigation }) => (
  <ScrollView>
    <Banner />
    {Object.keys(ExampleRoutes).map((routeName: string) => (
      <TouchableOpacity
        key={routeName}
        onPress={() => {
          const { path, params, screen } = ExampleRoutes[routeName];
          const { router } = screen;
          const action = path && router.getActionForPathAndParams(path, params);
          navigation.navigate(routeName, {}, action);
        }}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{ExampleRoutes[routeName].name}</Text>
          <Text style={styles.description}>
            {ExampleRoutes[routeName].description}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const AppNavigator = StackNavigator(
  {
    ...ExampleRoutes,
    Index: {
      screen: MainScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
     * Use modal on iOS because the card mode comes from the right,
     * which conflicts with the drawer example gesture
     */
    mode: 'card',
    // mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
);

export default () => <AppNavigator />;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
});