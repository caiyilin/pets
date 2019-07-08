import { $wuxToast } from '../components/index'
let util = {
  toast(tip, type="success", duration=2000, callback){
    switch(type){
      case 'success':
        this.successToast(duration, tip, callback);
        break;
      case 'error':
        this.errorToast(duration, tip, callback);
        break;
    }
  },
  successToast(duration, tip, callback){
    $wuxToast().show({
      type: 'success',
      duration: duration,
      color: '#fff',
      text: tip,
      success: () => (callback && typeof (callback) === "function") && callback()
    })
  },
  errorToast(duration, tip, callback) {
    $wuxToast().error({
      type: 'success',
      duration: duration,
      color: '#fff',
      text: tip,
      success: () => (callback && typeof (callback) === "function") && callback()
    })
  }
}
module.exports = util;