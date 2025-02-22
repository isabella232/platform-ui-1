<!-- Copyright (c) 2020-2022 ForgeRock. All rights reserved.

This software may be modified and distributed under the terms
of the MIT license. See the LICENSE file for details. -->
<template>
  <div
    id="app"
    :class="{ invisible: hideAppOnTransition }">
    <ThemeInjector
      :theme="theme"
      v-if="theme !== null" />
    <div
      id="appContentWrapper"
      class="h-100">
      <Transition
        name="fade"
        mode="out-in">
        <RouterView
          :journey-footer="getLocalizedString(journeyFooter, i18n.locale, i18n.fallbackLocale)"
          :journey-footer-enabled="journeyFooterEnabled"
          :journey-header="getLocalizedString(journeyHeader, i18n.locale, i18n.fallbackLocale)"
          :journey-header-enabled="journeyHeaderEnabled"
          :journey-theater-mode="journeyTheaterMode"
          :journey-justified-content="getLocalizedString(journeyJustifiedContent, i18n.locale, i18n.fallbackLocale)"
          :journey-justified-content-enabled="journeyJustifiedContentEnabled"
          :journey-layout="journeyLayout"
          :logo-alt-text="logoAltText"
          :logo-enabled="logoEnabled"
          :logo-height="logoHeight"
          :logo-path="logo"
          :key="$route.fullPath"
          :theme-loading="theme === null"
          @set-theme="setupTheme"
          @component-ready="themeTransitionHandler" />
      </Transition>
    </div>
    <!-- Application View -->
    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
    <notifications
      class="ml-3"
      position="bottom left"
      width="320"
      :duration="4000">
      <template v-slot:body="props">
        <FrAlert
          :variant="props.item.type"
          show>
          {{ props.item.text }}
        </FrAlert>
      </template>
    </notifications>
  </div>
</template>

<script>
import Alert from '@forgerock/platform-shared/src/components/Alert/';
import ThemeInjector from '@forgerock/platform-shared/src/components/ThemeInjector/';
import RestMixin from '@forgerock/platform-shared/src/mixins/RestMixin';
import ThemeMixin from '@forgerock/platform-shared/src/mixins/ThemeMixin';
import ValidationRules from '@forgerock/platform-shared/src/utils/validationRules';
import i18n from './i18n';
import './scss/main.scss';

export default {
  name: 'App',
  components: {
    FrAlert: Alert,
    ThemeInjector,
  },
  mixins: [
    RestMixin,
    ThemeMixin,
  ],
  data() {
    return {
      hideAppOnTransition: false,
      i18n,
    };
  },
  created() {
    // add vee-validate rules
    const rules = ValidationRules.getRules(i18n);
    ValidationRules.extendRules(rules);
  },
  methods: {
    setupTheme(realm, treeId, nodeThemeId) {
      // Check if web storage exists before trying to use it. This allows
      // theming to gracefully fail in the case it doesn't exist - see
      // IAM-1873
      const { webStorageAvailable } = this.$store.state.SharedStore;
      const themeId = webStorageAvailable ? localStorage.getItem('theme-id') : null;
      const themeOpts = { treeId, themeId, nodeThemeId };
      this.setTheme(realm, themeOpts).then(() => {
        if (this.favicon) {
          document.getElementById('favicon').href = this.favicon;
        }
      });
    },
    themeTransitionHandler(val) {
      if (val === 'error') {
        this.hideAppOnTransition = false;
        return;
      }
      this.hideAppOnTransition = true;
    },
  },
  watch: {
    theme() {
      this.hideAppOnTransition = false;
    },
  },
};
</script>
