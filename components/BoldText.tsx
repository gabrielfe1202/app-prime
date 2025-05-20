import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface BoldTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const BoldText: React.FC<BoldTextProps> = ({ children, style }) => {
  return <Text style={[{ fontWeight: 'bold' }, style]}>{children}</Text>;
};

export default BoldText;
