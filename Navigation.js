import React from 'react';
import {NavigationContainer, } from '@react-navigation/native';
import ScreensNav from './components/nav/ScreenNav';

export default function RootNavigation() {
	return (
        <NavigationContainer>
            <ScreensNav/>
        </NavigationContainer>
    );
}