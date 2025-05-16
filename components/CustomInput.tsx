// components/MaskInput.tsx
import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import MaskInput from 'react-native-mask-input';

type MaskedInputProps = TextInputProps & {
  mask?: (string | RegExp)[];
};

export const masks = {
  phone: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  cellphone: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  zipCode: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
};

export const CustomInput = ({ mask, style, ...rest }:  MaskedInputProps) => {
  return (
    <View style={styles.container}>
      {mask ? (
        <MaskInput
          mask={mask}
          style={[styles.input, style]}
          {...rest}
        />
      ) : (
        <TextInput
          style={[styles.input, style]}
          {...rest}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#616161'
  },
});
