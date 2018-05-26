/* @flow strict */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import StyledText from './StyledText';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  style?: TextStyleProp,
};

/**
 * Typography component for showing a headline.
 *
 * <div class="screenshots">
 *   <img src="screenshots/headline.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Headline } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Headline>Headline</Headline>
 * );
 * ```
 */
const Headline = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.87}
    family="regular"
    style={[styles.text, props.style]}
  />
);

export default Headline;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    lineHeight: 32,
    marginVertical: 2,
  },
});
