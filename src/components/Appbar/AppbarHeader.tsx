import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  SafeAreaView,
  ViewStyle,
  StatusBar,
} from 'react-native';
import overlay from '../../styles/overlay';
import Appbar, { DEFAULT_APPBAR_HEIGHT } from './Appbar';
import shadow from '../../styles/shadow';
import { withTheme } from '../../core/theming';
import { Theme } from '../../types';
import { APPROX_STATUSBAR_HEIGHT } from '../../constants';
import color from 'color';

type Props = React.ComponentProps<typeof Appbar> & {
  /**
   * Whether the background color is a dark color. A dark header will render light text and vice-versa.
   */
  dark?: boolean;
  /**
   * Extra padding to add at the top of header to account for translucent status bar.
   * This is automatically handled on iOS >= 11 including iPhone X using `SafeAreaView`.
   * If you are using Expo, we assume translucent status bar and set a height for status bar automatically.
   * Pass `0` or a custom value to disable the default behaviour, and customize the height.
   */
  statusBarHeight?: number;
  /**
   * Pass `true` if you want Appbar to use theme primary color even in dark mode.
   * By default in dark mode Appbar use surface color.
   */
  primary?: boolean;
  /**
   * Content of the header.
   */
  children: React.ReactNode;
  /**
   * @optional
   */
  theme: Theme;
  style?: StyleProp<ViewStyle>;
};

/**
 * A component to use as a header at the top of the screen.
 * It can contain the screen title, controls such as navigation buttons, menu button etc.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/appbar-header.android.png" />
 *     <figcaption>Android</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="medium" src="screenshots/appbar-header.ios.png" />
 *     <figcaption>iOS</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 *
 * export default class MyComponent extends React.Component {
 *   _goBack = () => console.log('Went back');
 *
 *   _onSearch = () => console.log('Searching');
 *
 *   _onMore = () => console.log('Shown more');
 *
 *   render() {
 *     return (
 *       <Appbar.Header>
 *         <Appbar.BackAction
 *           onPress={this._goBack}
 *         />
 *         <Appbar.Content
 *           title="Title"
 *           subtitle="Subtitle"
 *         />
 *         <Appbar.Action icon="search" onPress={this._onSearch} />
 *         <Appbar.Action icon="more-vert" onPress={this._onMore} />
 *       </Appbar.Header>
 *     );
 *   }
 * }
 * ```
 */
class AppbarHeader extends React.Component<Props> {
  static displayName = 'Appbar.Header';

  render() {
    const {
      // Don't use default props since we check it to know whether we should use SafeAreaView
      statusBarHeight = APPROX_STATUSBAR_HEIGHT,
      style,
      primary,
      dark,
      ...rest
    } = this.props;
    const { dark: isDarkTheme, colors } = rest.theme;
    const {
      height = DEFAULT_APPBAR_HEIGHT,
      elevation = 4,
      backgroundColor = isDarkTheme && !primary
        ? overlay(4, colors.surface)
        : colors.primary,
      zIndex = 0,
      ...restStyle
    } = StyleSheet.flatten(style) || {};

    // Let the user override the behaviour
    const Wrapper =
      typeof this.props.statusBarHeight === 'number' ? View : SafeAreaView;
    let isDark;
    if (typeof dark === 'boolean') {
      isDark = dark;
    } else {
      isDark =
        backgroundColor === 'transparent'
          ? false
          : !color(backgroundColor).light();
    }
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');

    return (
      <Wrapper
        style={
          [
            { backgroundColor, zIndex },
            elevation && shadow(elevation),
          ] as StyleProp<ViewStyle>
        }
      >
        {/* $FlowFixMe: There seems to be conflict between Appbar's props and Header's props */}
        <Appbar
          style={[
            { height, backgroundColor, marginTop: statusBarHeight },
            styles.appbar,
            restStyle,
          ]}
          dark={dark}
          primary={primary}
          {...rest}
        />
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  appbar: {
    elevation: 0,
  },
});

export default withTheme(AppbarHeader);

// @component-docs ignore-next-line
export { AppbarHeader };