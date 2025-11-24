"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Pagination = _interopRequireDefault(require("./Pagination.style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class PaginationDot extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animColor: new _reactNative.Animated.Value(0),
      animOpacity: new _reactNative.Animated.Value(0),
      animTransform: new _reactNative.Animated.Value(0)
    };
  }
  componentDidMount() {
    if (this.props.active) {
      this._animate(1);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this._animate(this.props.active ? 1 : 0);
    }
  }
  _animate(toValue = 0) {
    const {
      animColor,
      animOpacity,
      animTransform
    } = this.state;
    const {
      animatedDuration,
      animatedFriction,
      animatedTension
    } = this.props;
    const commonProperties = {
      toValue,
      isInteraction: false,
      useNativeDriver: !this._shouldAnimateColor
    };
    const animations = [_reactNative.Animated.timing(animOpacity, {
      easing: _reactNative.Easing.linear,
      duration: animatedDuration,
      ...commonProperties
    }), _reactNative.Animated.spring(animTransform, {
      friction: animatedFriction,
      tension: animatedTension,
      ...commonProperties
    })];
    if (this._shouldAnimateColor) {
      animations.push(_reactNative.Animated.timing(animColor, {
        easing: _reactNative.Easing.linear,
        ...commonProperties
      }));
    }
    _reactNative.Animated.parallel(animations).start();
  }
  get _shouldAnimateColor() {
    const {
      color,
      inactiveColor
    } = this.props;
    return color && inactiveColor;
  }
  render() {
    const {
      animColor,
      animOpacity,
      animTransform
    } = this.state;
    const {
      active,
      activeOpacity,
      carouselRef,
      color,
      containerStyle,
      inactiveColor,
      inactiveStyle,
      inactiveOpacity,
      inactiveScale,
      index,
      style,
      tappable,
      delayPressInDot
    } = this.props;
    const animatedStyle = {
      opacity: animOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [inactiveOpacity, 1]
      }),
      transform: [{
        scale: animTransform.interpolate({
          inputRange: [0, 1],
          outputRange: [inactiveScale, 1]
        })
      }]
    };
    const animatedColor = this._shouldAnimateColor && inactiveColor && color ? {
      backgroundColor: animColor.interpolate({
        inputRange: [0, 1],
        outputRange: [inactiveColor, color]
      })
    } : {};
    const dotContainerStyle = [_Pagination.default.sliderPaginationDotContainer, containerStyle || {}];
    const dotStyle = [_Pagination.default.sliderPaginationDot, style || {}, !active && inactiveStyle || {}, animatedStyle, animatedColor];
    const onPress = tappable && (!!index || index === 0) ? () => {
      try {
        const currentRef = carouselRef && 'current' in carouselRef ? carouselRef.current : carouselRef;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentRef._snapToItem(currentRef._getPositionIndex(index));
      } catch (error) {
        console.warn('react-native-snap-carousel | Pagination: ' + '`carouselRef` has to be a Carousel ref.\n' + error);
      }
    } : undefined;
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      accessible: false,
      style: dotContainerStyle,
      activeOpacity: tappable ? activeOpacity : 1,
      onPress: onPress,
      delayPressIn: delayPressInDot
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: dotStyle
    }));
  }
}
exports.default = PaginationDot;
//# sourceMappingURL=PaginationDot.js.map