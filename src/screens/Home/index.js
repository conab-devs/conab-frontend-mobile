import React from 'react';
import {View, Text} from 'react-native';
import {Container as C} from '../../styles/utils'
import {lightgray} from '../../styles/colors';
import styled from 'styled-components/native';

const Container = styled(C)`
	background-color: ${lightgray}; 
	align-items: flex-start;
	justify-content: flex-start;
`;

const Home = () => (
  <Container>
    <Text>Home</Text>
  </Container>
);

export default Home;
