/**
 * Copyright (c) 2019-2022 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import getFQDN from '@forgerock/platform-shared/src/utils/getFQDN';

const defaultState = {
  amBaseURL: '',
  analyticsURL: '',
  idmBaseURL: '',
  currentPackage: '',
  fraasLoggingKeyURL: null,
  fraasEnvironmentUrl: null,
  fraasMonitoringURL: null,
  googleMapsApiKey: '',
  returnRoute: '',
  returnRouteText: '',
  uiConfig: null,
  hasAmUrl: false,
  showEsvUi: false,
  webStorageAvailable: true,
};

const mutations = {
  setBaseURLs(state, env) {
    if (env.VUE_APP_AM_URL && env.VUE_APP_AM_URL.length > 0) {
      state.hasAmUrl = true;
      state.amBaseURL = getFQDN(env.VUE_APP_AM_URL);
    }

    if (env.VUE_APP_IDM_URL) {
      state.idmBaseURL = getFQDN(env.VUE_APP_IDM_URL);
    }

    if (env.VUE_APP_ANALYTICS_API_URL) {
      state.analyticsURL = env.VUE_APP_ANALYTICS_API_URL;
    }

    if (env.VUE_APP_FRAAS === 'true') {
      if (env.VUE_APP_FRAAS_ENV_URL) {
        state.fraasEnvironmentUrl = env.VUE_APP_FRAAS_ENV_URL;
      }
      if (env.VUE_APP_FRAAS_LOGGING_URL) {
        state.fraasLoggingKeyURL = env.VUE_APP_FRAAS_LOGGING_URL;
      }
      if (env.VUE_APP_FRAAS_MONITORING_URL) {
        state.fraasMonitoringURL = env.VUE_APP_FRAAS_MONITORING_URL;
      }
    }

    if (env.VUE_APP_GOOGLE_MAPS_API_KEY) {
      state.googleMapsApiKey = env.VUE_APP_GOOGLE_MAPS_API_KEY;
    }
  },

  setReturnRoute(state, newValue) {
    if (newValue.returnRoute || newValue.returnRoute === '') {
      state.returnRoute = newValue.returnRoute;
    }

    if (newValue.returnRouteText || newValue.returnRouteText === '') {
      state.returnRouteText = newValue.returnRouteText;
    }
  },

  setUiConfig(state, newValue) {
    state.uiConfig = newValue;
  },

  setCurrentPackage(state, newValue) {
    state.currentPackage = newValue;
  },

  setFeatureFlags(state, env) {
    if (env.VUE_APP_FRAAS === 'true') {
      if (env.VUE_APP_SHOW_ESV_UI) {
        state.showEsvUi = env.VUE_APP_SHOW_ESV_UI === 'true' || env.VUE_APP_SHOW_ESV_UI === true;
      }
    }
  },
  setWebStorageAvailable(state, val) {
    state.webStorageAvailable = val;
  },
};

export default {
  state: defaultState,
  mutations,
};
