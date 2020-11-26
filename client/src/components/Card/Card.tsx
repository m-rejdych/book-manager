import React from 'react';
import { useColorMode, Stack } from '@chakra-ui/react';

const Card: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      spacing={4}
      h={400}
      w={300}
      p={4}
      m={4}
      borderRadius="lg"
      bgColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      boxShadow="0 3px 7px #000"
      align="center"
      justify="space-around"
    >
      {children}
    </Stack>
  );
};

export default Card;
