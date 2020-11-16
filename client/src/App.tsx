import * as React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import ColorModeSwitcher from './components/ColorModeSwitcher';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Box position="relative" minH="100vh">
        <ColorModeSwitcher position="absolute" top={3} right={3} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
