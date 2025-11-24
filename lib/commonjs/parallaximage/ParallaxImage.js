"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ParallaxImageStatus = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ParallaxImage2 = _interopRequireDefault(require("./ParallaxImage.style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Parallax effect inspired by https://github.com/oblador/react-native-parallax/
let ParallaxImageStatus = exports.ParallaxImageStatus = /*#__PURE__*/function (ParallaxImageStatus) {
  ParallaxImageStatus[ParallaxImageStatus["LOADING"] = 1] = "LOADING";
  ParallaxImageStatus[ParallaxImageStatus["LOADED"] = 2] = "LOADED";
  ParallaxImageStatus[ParallaxImageStatus["TRANSITION_FINISHED"] = 3] = "TRANSITION_FINISHED";
  ParallaxImageStatus[ParallaxImageStatus["ERROR"] = 4] = "ERROR";
  return ParallaxImageStatus;
}({});
class ParallaxImage extends _react.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "_container", void 0);
    _defineProperty(this, "_mounted", void 0);
    this.state = {
      offset: 0,
      width: 0,
      height: 0,
      status: ParallaxImageStatus.LOADING,
      animOpacity: new _reactNative.Animated.Value(0)
    };
    this._onLoad = this._onLoad.bind(this);
    this._onError = this._onError.bind(this);
    this._measureLayout = this._measureLayout.bind(this);
  }
  setNativeProps(nativeProps) {
    var _this$_container;
    (_this$_container = this._container) === null || _this$_container === void 0 || _this$_container.setNativeProps(nativeProps);
  }
  componentDidMount() {
    this._mounted = true;
    setTimeout(() => {
      this._measureLayout();
    }, 0);
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  _measureLayout() {
    if (this._container) {
      const {
        dimensions,
        carouselRef
      } = this.props;
      const nodeHandle = (0, _reactNative.findNodeHandle)(carouselRef);
      if (carouselRef && nodeHandle) {
        this._container.measureLayout(nodeHandle, (x, y, width, height) => {
          const offset = this.props.vertical ? y - (this.props.sliderHeight - this.props.itemHeight) / 2 : x - (this.props.sliderWidth - this.props.itemWidth) / 2;
          this.setState({
            offset: offset,
            width: dimensions && dimensions.width ? dimensions.width : Math.ceil(width),
            height: dimensions && dimensions.height ? dimensions.height : Math.ceil(height)
          });
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {});
      }
    }
  }
  _onLoad(event) {
    const {
      animOpacity
    } = this.state;
    const {
      fadeDuration,
      onLoad
    } = this.props;
    if (!this._mounted) {
      return;
    }
    this.setState({
      status: ParallaxImageStatus.LOADED
    });
    if (onLoad) {
      onLoad(event);
    }
    _reactNative.Animated.timing(animOpacity, {
      toValue: 1,
      duration: fadeDuration,
      easing: _reactNative.Easing.out(_reactNative.Easing.quad),
      isInteraction: false,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        status: ParallaxImageStatus.TRANSITION_FINISHED
      });
    });
  }

  // If arg is missing from method signature, it just won't be called
  _onError(event) {
    const {
      onError
    } = this.props;
    this.setState({
      status: ParallaxImageStatus.ERROR
    });
    if (onError) {
      onError(event);
    }
  }
  get image() {
    const {
      status,
      animOpacity,
      offset,
      width,
      height
    } = this.state;
    const {
      scrollPosition,
      // False positive :( other doesn't have the dimension key
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dimensions,
      parallaxFactor,
      style,
      AnimatedImageComponent,
      ...other
    } = this.props;
    const parallaxPadding = (this.props.vertical ? height : width) * parallaxFactor;
    const requiredStyles = {
      position: 'relative'
    };
    const dynamicStyles = {
      width: this.props.vertical ? width : width + parallaxPadding * 2,
      height: this.props.vertical ? height + parallaxPadding * 2 : height,
      opacity: animOpacity,
      transform: scrollPosition ? [{
        translateX: !this.props.vertical ? scrollPosition.interpolate({
          inputRange: [offset - this.props.sliderWidth, offset + this.props.sliderWidth],
          outputRange: [-parallaxPadding, parallaxPadding],
          extrapolate: 'clamp'
        }) : 0
      }, {
        translateY: this.props.vertical ? scrollPosition.interpolate({
          inputRange: [offset - this.props.sliderHeight, offset + this.props.sliderHeight],
          outputRange: [-parallaxPadding, parallaxPadding],
          extrapolate: 'clamp'
        }) : 0
      }] : []
    };
    return /*#__PURE__*/_react.default.createElement(AnimatedImageComponent, _extends({}, other, {
      style: [_ParallaxImage2.default.image, style, requiredStyles, dynamicStyles],
      onLoad: this._onLoad,
      onError: status !== ParallaxImageStatus.TRANSITION_FINISHED ? this._onError : undefined // prevent infinite-loop bug
    }));
  }
  get spinner() {
    const {
      status
    } = this.state;
    const {
      showSpinner,
      spinnerColor
    } = this.props;
    return status === ParallaxImageStatus.LOADING && showSpinner ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _ParallaxImage2.default.loaderContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "small",
      color: spinnerColor,
      animating: true
    })) : false;
  }
  render() {
    const {
      containerStyle
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      ref: c => {
        this._container = c;
      },
      pointerEvents: "none",
      style: [containerStyle, _ParallaxImage2.default.container],
      onLayout: this._measureLayout
    }, this.image, this.spinner);
  }
}
exports.default = ParallaxImage;
_defineProperty(ParallaxImage, "defaultProps", {
  containerStyle: {},
  fadeDuration: 500,
  parallaxFactor: 0.3,
  showSpinner: true,
  spinnerColor: 'rgba(0, 0, 0, 0.4)',
  AnimatedImageComponent: _reactNative.Animated.Image
});
//# sourceMappingURL=ParallaxImage.js.map