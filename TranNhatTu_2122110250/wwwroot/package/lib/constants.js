/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// NOTE(cdata): The HAS_WEBXR_* constants can be enabled in Chrome by turning on
// the appropriate flags. However, just because we have the API does not
// guarantee that AR will work.
export const HAS_WEBXR_DEVICE_API = navigator.xr != null &&
    self.XRSession != null && navigator.xr.isSessionSupported != null;
export const HAS_WEBXR_HIT_TEST_API = HAS_WEBXR_DEVICE_API &&
    self.XRSession.prototype.requestHitTestSource != null;
export const HAS_RESIZE_OBSERVER = self.ResizeObserver != null;
export const HAS_INTERSECTION_OBSERVER = self.IntersectionObserver != null;
export const IS_WEBXR_AR_CANDIDATE = HAS_WEBXR_HIT_TEST_API;
export const IS_MOBILE = (() => {
    const userAgent = navigator.userAgent || navigator.vendor || self.opera;
    let check = false;
    // eslint-disable-next-line
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
        .test(userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
            .test(userAgent.substr(0, 4))) {
        check = true;
    }
    return check;
})();
export const IS_CHROMEOS = /\bCrOS\b/.test(navigator.userAgent);
export const IS_ANDROID = /android/i.test(navigator.userAgent);
// Prior to iOS 13, detecting iOS Safari was relatively straight-forward.
// As of iOS 13, Safari on iPad (in its default configuration) reports the same
// user-agent string as Safari on desktop MacOS. Strictly speaking, we only care
// about iOS for the purposes if selecting for cases where Quick Look is known
// to be supported. However, for API correctness purposes, we must rely on
// known, detectable signals to distinguish iOS Safari from MacOS Safari. At the
// time of this writing, there are no non-iOS/iPadOS Apple devices with
// multi-touch displays.
// @see https://stackoverflow.com/questions/57765958/how-to-detect-ipad-and-ipad-os-version-in-ios-13-and-up
// @see https://forums.developer.apple.com/thread/119186
// @see https://github.com/google/model-viewer/issues/758
export const IS_IOS = (/iPad|iPhone|iPod/.test(navigator.userAgent) && !self.MSStream) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
// @see https://developer.chrome.com/multidevice/user-agent
export const IS_SAFARI = /Safari\//.test(navigator.userAgent);
export const IS_FIREFOX = /firefox/i.test(navigator.userAgent);
export const IS_OCULUS = /OculusBrowser/.test(navigator.userAgent);
export const IS_IOS_CHROME = IS_IOS && /CriOS\//.test(navigator.userAgent);
export const IS_IOS_SAFARI = IS_IOS && IS_SAFARI;
export const IS_SCENEVIEWER_CANDIDATE = IS_ANDROID && !IS_FIREFOX && !IS_OCULUS;
export const IS_WKWEBVIEW = Boolean(window.webkit && window.webkit.messageHandlers);
// If running in iOS Safari proper, and not within a WKWebView component
// instance, check for ARQL feature support. Otherwise, if running in a
// WKWebView instance, check for known ARQL compatible iOS browsers, including:
// Chrome (CriOS), Edge (EdgiOS), Firefox (FxiOS), Google App (GSA), DuckDuckGo
// (DuckDuckGo). All other iOS browsers / apps will fail by default.
export const IS_AR_QUICKLOOK_CANDIDATE = (() => {
    if (IS_IOS) {
        if (!IS_WKWEBVIEW) {
            const tempAnchor = document.createElement('a');
            return Boolean(tempAnchor.relList && tempAnchor.relList.supports &&
                tempAnchor.relList.supports('ar'));
        }
        else {
            return Boolean(/CriOS\/|EdgiOS\/|FxiOS\/|GSA\/|DuckDuckGo\//.test(navigator.userAgent));
        }
    }
    else {
        return false;
    }
})();
//# sourceMappingURL=constants.js.map