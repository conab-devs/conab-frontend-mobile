import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const TabBar = ({
  state,
  descriptors,
  navigation,
  activeTintColor,
  inactiveTintColor,
  showLabel,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const TabBarIcon =
          options.tabBarIcon !== undefined ? options.tabBarIcon : null;
        const tabBarLabel =
          options.tabBarLabel !== undefined && showLabel
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const selectedColor = isFocused ? activeTintColor : inactiveTintColor;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabBarIconSize = showLabel ? 28 : 32;

        return (
          <TouchableOpacity
            style={styles.button}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <TabBarIcon color={selectedColor} size={tabBarIconSize} />
            {showLabel ? (
              <Text style={getTextStyles(selectedColor).text}>
                {tabBarLabel}
              </Text>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '$darkBlue',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '0.62rem',
    paddingBottom: '0.62rem',
    paddingRight: 0,
    paddingLeft: 0,
  },
});

const getTextStyles = (color) =>
  EStyleSheet.create({
    text: {
      color,
      fontWeight: 'bold',
    },
  });

export default TabBar;
