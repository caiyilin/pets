"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames2 = _interopRequireDefault(require("../helpers/classNames")),
  _styleToCssString = _interopRequireDefault(require("../helpers/styleToCssString")),
  _index = require("../index");

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _defineProperty(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e
}(0, _baseComponent.default)({
  useSafeArea: !0,
  externalClasses: ["wux-content-class", "wux-header-class", "wux-body-class", "wux-footer-class", "wux-close-class"],
  properties: {
    prefixCls: {
      type: String,
      value: "wux-popup"
    },
    animationPrefixCls: {
      type: String,
      value: "wux-animate"
    },
    title: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    },
    extra: {
      type: String,
      value: ""
    },
    position: {
      type: String,
      value: "center",
      observer: "getTransitionName"
    },
    wrapStyle: {
      type: [String, Object],
      value: "",
      observer: function(e) {
        this.setData({
          extStyle: (0, _styleToCssString.default)(e)
        })
      }
    },
    closable: {
      type: Boolean,
      value: !1
    },
    mask: {
      type: Boolean,
      value: !0
    },
    maskClosable: {
      type: Boolean,
      value: !0
    },
    visible: {
      type: Boolean,
      value: !1,
      observer: "setPopupVisible"
    },
    zIndex: {
      type: Number,
      value: 1e3
    },
    hasHeader: {
      type: Boolean,
      value: !0
    },
    hasFooter: {
      type: Boolean,
      value: !0
    },
    mountOnEnter: {
      type: Boolean,
      value: !0
    },
    unmountOnExit: {
      type: Boolean,
      value: !0
    }
  },
  data: {
    transitionName: "",
    popupVisible: !1,
    extStyle: ""
  },
  computed: {
    classes: ["prefixCls, position, safeAreaConfig, isIPhoneX", function(e, t, a, i) {
      var o;
      return {
        wrap: (0, _classNames2.default)("".concat(e, "-position"), (_defineProperty(o = {}, "".concat(e, "-position--").concat(t), t), _defineProperty(o, "".concat(e, "-position--is-iphonex"), a.bottom && i), o)),
        content: "".concat(e, "__content"),
        hd: "".concat(e, "__hd"),
        title: "".concat(e, "__title"),
        bd: "".concat(e, "__bd"),
        ft: "".concat(e, "__ft"),
        extra: "".concat(e, "__extra"),
        close: "".concat(e, "__close"),
        x: "".concat(e, "__close-x")
      }
    }]
  },
  methods: {
    close: function() {
      this.triggerEvent("close")
    },
    onMaskClick: function() {
      this.data.maskClosable && this.close()
    },
    onExited: function() {
      this.triggerEvent("closed")
    },
    getTransitionName: function(e) {
      var t = 0 < arguments.length && void 0 !== e ? e : this.data.position,
        a = this.data.animationPrefixCls,
        i = "";
      switch (t) {
        case "top":
          i = "".concat(a, "--slideInDown");
          break;
        case "right":
          i = "".concat(a, "--slideInRight");
          break;
        case "bottom":
          i = "".concat(a, "--slideInUp");
          break;
        case "left":
          i = "".concat(a, "--slideInLeft");
          break;
        default:
          i = "".concat(a, "--fadeIn")
      }
      this.setData({
        transitionName: i
      })
    },
    setPopupVisible: function(e) {
      this.data.popupVisible !== e && (this.setData({
        popupVisible: e
      }), this.setBackdropVisible(e))
    },
    setBackdropVisible: function(e) {
      this.data.mask && this.$wuxBackdrop && this.$wuxBackdrop[e ? "retain" : "release"]()
    }
  },
  created: function() {
    this.data.mask && (this.$wuxBackdrop = (0, _index.$wuxBackdrop)("#wux-backdrop", this))
  },
  attached: function() {
    this.setPopupVisible(this.data.visible), this.getTransitionName()
  }
});