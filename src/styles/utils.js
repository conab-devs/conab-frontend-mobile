import styled from 'styled-components/native';

import {green} from './colors';

export const Container = styled.SafeAreaView`
  background-color: ${green};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
`;

export const getContainer = () => ({
	container: {
	    backgroundColor: 'white',
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    paddingTop: '1.7rem',
	    paddingBottom: '.5rem',
	    paddingRight: '1.25rem',
	    paddingLeft: '1.25rem',
    },
});
