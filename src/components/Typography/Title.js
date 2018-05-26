/* @flow strict */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import StyledText from './StyledText';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  style?: TextStyleProp,
};

/**
 * Typography component for showing a title.
 *
 * <div class="screenshots">
 *   <img src="screenshots/title.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Title } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Title>Title</Title>
 * );
 * ```
 */
const Title = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.87}
    family="medium"
    style={[styles.text, props.style]}
  />
);

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 30,
    marginVertical: 2,
  },
});
