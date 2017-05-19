/**
 * Created by Gaohan on 2017/5/19.
 */

import React from 'react';

import { StyleSheet, Text } from 'react-native';

/**
 * Used across examples as a screen placeholder.
 */
import type { Children } from 'react';

const DemoText = ({ children }: { children?: Children }) => (
  <Text style={styles.sampleText}>{children}</Text>
);

export default DemoText;

const styles = StyleSheet.create({
  sampleText: {
    margin: 14,
  },
});