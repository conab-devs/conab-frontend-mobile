import React from 'react';

import {TBContainer, TBButton, TBButtonText} from './styles';

const TabBar = ({
  state,
  descriptors,
  navigation,
  activeTintColor,
  inactiveTintColor,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <TBContainer>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const TabBarIcon =
          options.tabBarIcon !== undefined ? options.tabBarIcon : null;

        const tabBarLabel =
          options.tabBarLabel !== undefined
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

        return (
          <TBButton
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <TabBarIcon color={selectedColor} size={28} />
            <TBButtonText color={selectedColor}>{tabBarLabel}</TBButtonText>
          </TBButton>
        );
      })}
    </TBContainer>
  );
};

// // ...

// <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
//   {...}
// </Tab.Navigator>

export default TabBar;
