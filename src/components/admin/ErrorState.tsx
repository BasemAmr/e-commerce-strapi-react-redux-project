import { FC } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Button, 
} from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';
import {useColorModeValue} from '@chakra-ui/color-mode';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: FC<ErrorStateProps> = ({ 
  message = 'Something went wrong', 
  onRetry 
}) => {
  const bgColor = useColorModeValue('red.50', 'red.900');
  const textColor = useColorModeValue('red.600', 'red.200');

  return (
    <Box 
      p={8} 
      bg={bgColor} 
      borderRadius="md"
      textAlign="center"
    >
      <VStack gap={4}>
        <AlertTriangle size={48} color={textColor} />
        <Text color={textColor} fontSize="lg" fontWeight="medium">
          {message}
        </Text>
        {onRetry && (
          <Button
            colorScheme="red"
            variant="outline"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </VStack>
    </Box>
  );
};