"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PaginationDot = _interopRequireDefault(require("./PaginationDot"));
var _Pagination2 = _interopRequireDefault(require("./Pagination.style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const IS_IOS = _reactNative.Platform.OS === 'ios';
const IS_RTL = _reactNative.I18nManager.isRTL;
class Pagination extends _react.PureComponent {
  constructor(props) {
    super(props);

    // Warnings
    if (props.dotColor && !props.inactiveDotColor || !props.dotColor && props.inactiveDotColor) {
      console.warn('react-native-snap-carousel | Pagination: ' + 'You need to specify both `dotColor` and `inactiveDotColor`');
    }
    if (props.dotElement && !props.inactiveDotElement || !props.dotElement && props.inactiveDotElement) {
      console.warn('react-native-snap-carousel | Pagination: ' + 'You need to specify both `dotElement` and `inactiveDotElement`');
    }
    if (props.tappableDots && props.carouselRef === undefined) {
      console.warn('react-native-snap-carousel | Pagination: ' + 'You must specify prop `carouselRef` when setting `tappableDots` to `true`');
    }
  }
  _needsRTLAdaptations() {
    const {
      vertical
    } = this.props;
    return IS_RTL && !IS_IOS && !vertical;
  }
  get _activeDotIndex() {
    const {
      activeDotIndex,
      dotsLength
    } = this.props;
    return this._needsRTLAdaptations() ? dotsLength - activeDotIndex - 1 : activeDotIndex;
  }
  get dots() {
    const {
      activeOpacity,
      carouselRef,
      dotsLength,
      dotColor,
      dotContainerStyle,
      dotElement,
      dotStyle,
      inactiveDotColor,
      inactiveDotElement,
      inactiveDotOpacity,
      inactiveDotScale,
      inactiveDotStyle,
      renderDots,
      tappableDots,
      animatedDuration,
      animatedFriction,
      animatedTension,
      delayPressInDot
    } = this.props;
    if (renderDots) {
      return renderDots(this._activeDotIndex, dotsLength, this);
    }
    const DefaultDot = /*#__PURE__*/_react.default.createElement(_PaginationDot.default, {
      carouselRef: carouselRef,
      tappable: tappableDots && typeof carouselRef !== 'undefined',
      activeOpacity: activeOpacity,
      color: dotColor,
      containerStyle: dotContainerStyle,
      style: dotStyle,
      inactiveColor: inactiveDotColor,
      inactiveOpacity: inactiveDotOpacity,
      inactiveScale: inactiveDotScale,
      inactiveStyle: inactiveDotStyle,
      animatedDuration: animatedDuration,
      animatedFriction: animatedFriction,
      animatedTension: animatedTension,
      delayPressInDot: delayPressInDot
    });
    const dots = [...Array(dotsLength).keys()].map(i => {
      const isActive = i === this._activeDotIndex;
      return /*#__PURE__*/_react.default.cloneElement((isActive ? dotElement : inactiveDotElement) || DefaultDot, {
        key: `pagination-dot-${i}`,
        active: isActive,
        index: i
      });
    });
    return dots;
  }
  render() {
    const {
      dotsLength,
      containerStyle,
      vertical,
      accessibilityLabel
    } = this.props;
    if (!dotsLength || dotsLength < 2) {
      return false;
    }
    const style = [_Pagination2.default.sliderPagination, {
      flexDirection: vertical ? 'column' : this._needsRTLAdaptations() ? 'row-reverse' : 'row'
    }, containerStyle || {}];
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      pointerEvents: "box-none",
      style: style,
      accessible: !!accessibilityLabel,
      accessibilityLabel: accessibilityLabel
    }, this.dots);
  }
}
exports.default = Pagination;
_defineProperty(Pagination, "defaultProps", {
  inactiveDotOpacity: 0.5,
  inactiveDotScale: 0.5,
  tappableDots: false,
  vertical: false,
  animatedDuration: 250,
  animatedFriction: 4,
  animatedTension: 50,
  delayPressInDot: 0
});
//# sourceMappingURL=Pagination.js.map