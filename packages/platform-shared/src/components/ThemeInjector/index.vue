<!-- Copyright (c) 2020-2022 ForgeRock. All rights reserved.

This software may be modified and distributed under the terms
of the MIT license. See the LICENSE file for details. -->
<template>
  <div>
    <Component :is="'style'">
      /**
      Shared styles
      */
      body {
      background-color: {{ backgroundColor }};
      }

      #app {
      font-family: {{ theme.fontFamily }}, sans-serif;
      }

      .fr-body-image {
      background-image: url('{{ theme.backgroundImage }}');
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> .btn {
      border-radius: {{ theme.buttonRounded }}px !important;
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> .btn-primary {
      background-color: {{ theme.primaryColor }} !important;
      outline-color: {{ theme.primaryColor }} !important;
      border-color: {{ theme.primaryColor }} !important;
      color: {{ theme.textColor }};
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> .btn-primary:disabled {
      background-color: {{ theme.primaryOffColor }} !important;
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> .btn-primary:hover {
      background-color: {{ theme.primaryOffColor }} !important;
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> a {
      font-weight: {{theme.boldLinks ? 700 : 400}};
      color: {{ theme.linkColor }};
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> a:hover {
      color: {{ theme.linkActiveColor }};
      }

      <template v-if="mock">.fr-enduser-theme-preview</template>  .btn-link,
      .nav-link {
      color: {{ theme.linkColor }};
      }

      <template v-if="mock">.fr-enduser-theme-preview</template>  .btn-link:hover,
      .nav-link:hover {
      color: {{ theme.linkActiveColor }};
      }

      body {
      color: {{ theme.bodyText }};
      }

      .text-body {
      color: {{ theme.bodyText }} !important;
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> .text-muted {
      color: {{ theme.secondaryColor }} !important;
      }

      <template v-if="mock">.fr-enduser-theme-preview</template> .text-danger {
      color: {{ theme.dangerColor }} !important;
      }

      h1 {
      color: {{ theme.pageTitle }};
      }

      .btn-primary:focus {
      -webkit-box-shadow: 0 0 0 0.0625rem {{ theme.primaryColor }};
      box-shadow: 0 0 0 0.0625rem {{ theme.primaryColor }};
      }

      .fr-custom-logo {
      max-width: 80px;
      align-self: center;
      }

      textarea:focus,
      <template v-if="mock">.fr-enduser-theme-preview</template> input:focus,
      <template v-if="mock">.fr-enduser-theme-preview</template> input[type]:focus,
      .uneditable-input:focus,
      <template v-if="mock">.fr-enduser-theme-preview</template> .form-control:focus-within .multiselect__tags {
      border-color: {{ theme.primaryColor }} !important;
      -webkit-box-shadow: 0 0 0 0.0625rem {{ theme.primaryColor }};
      box-shadow: 0 0 0 0.0625rem {{ theme.primaryColor }};
      outline: 0 none;
      }

      .fr-toggle-primary.custom-switch.b-custom-control-lg .custom-control-label::before {
      background-color: {{ theme.switchBackgroundColor }};
      }

      .fr-toggle-primary.custom-switch.b-custom-control-lg .custom-control-input:checked ~ .custom-control-label::before {
      background-color: {{ theme.primaryColor }};
      }

      .spinner-primary {
        color: {{ theme.primaryColor }};
      }
    </Component>

    <Component
      :is="'style'"
      v-if="!isEnduser">
      <!-- login card themes -->
      .card,
      .journey-card {
      background-color: {{ theme.journeyCardBackgroundColor || '#ffffff' }} !important;
      color: {{ theme.journeyCardTextColor || '#5e6d82' }};
      box-shadow: rgb(0 0 0 / 13%) 0px 1px {{ theme.journeyCardShadow !== undefined ? theme.journeyCardShadow : 3 }}px;
      }

      <!-- login card title -->
      .card .h2,
      .journey-card .h2 {
      color: {{ theme.journeyCardTitleColor || '#23282e' }};
      }

      <!-- login input and select fields -->
      input,
      .multiselect .multiselect__tags,
      .multiselect .multiselect__select,
      .multiselect .multiselect__select::before {
      background-color: {{ theme.journeyInputBackgroundColor || '#ffffff' }} !important;
      border-color: {{ theme.journeyInputBorderColor || '#c0c9d5' }} !important;
      color: {{ theme.journeyInputTextColor || '#23282e' }} !important;
      }

      .multiselect .multiselect__element {
      background-color: {{ theme.journeyInputBackgroundColor || '#ffffff' }} !important;
      color: {{ theme.journeyInputTextColor || '#23282e' }} !important;
      }

      .multiselect .multiselect__content-wrapper {
      border-color: {{ theme.journeyInputBorderColor || '#c0c9d5' }} !important;
      }

      .multiselect .multiselect__option--highlight,
      .multiselect .multiselect__option--selected {
      background-color: {{ theme.journeyInputSelectColor || '#e4f4fd' }} !important;
      }

      <!-- Styling for buttons within form label group inputs -->
      .form-label-group button span,
      .multiselect__placeholder,
      .multiselect__single {
      color: {{ theme.journeyInputTextColor || '#23282e' }} !important;
      }

      .form-label-group .form-label-group-input .white-label-background ~ label {
      background-color: {{ theme.journeyInputBackgroundColor || '#ffffff' }} !important;
      }

      .form-label-group label {
      color: {{ theme.journeyInputLabelColor || '#5e6d82' }} !important;
      }
    </Component>

    <Component
      :is="'style'"
      v-if="isEnduser">
      /**
      Enduser Theme Styles
      */

      #app .fr-sidebar-menuitems li a:not(.router-link-active),
      #app .fr-sidebar-menuitems li button {
      outline-color: {{ theme.primaryColor }};
      color: {{ theme.accountNavigationTextColor || '#455469' }};
      }

      #app .fr-sidebar-menuitems li a:hover,
      #app .fr-sidebar-menuitems li button:hover {
      background-color: {{ theme.profileMenuHoverColor }};
      color: {{ theme.profileMenuHoverTextColor }};
      }

      #app .router-link-active {
      background-color: {{ theme.profileMenuHighlightColor }};
      color: {{ theme.profileMenuTextHighlightColor }};
      border-left-color: {{ theme.primaryColor }};
      }

      #app .router-link-active:hover {
      background-color: {{ theme.profileMenuHoverColor }};
      color: {{ theme.profileMenuHoverTextColor }};
      }

      #app .fr-sidebar-brand:hover {
      background-color: inherit;
      color: inherit;
      }

      .fr-logo.fr-logo-vertical {
      background-image: url("{{ theme.logoProfileCollapsed ? theme.logoProfileCollapsed : require('@forgerock/platform-shared/src/assets/images/placeholder.svg') }}");
      height: {{ theme.logoProfileCollapsed ? theme.logoProfileHeight : theme.logoHeight }}px;
      }

      .fr-logo.fr-logo-horizontal {
      background-image: url("{{ theme.logoProfile ? theme.logoProfile : require('@forgerock/platform-shared/src/assets/images/horizontal-placeholder.svg') }}");
      height: {{ theme.logoProfileHeight ? theme.logoProfileHeight : theme.logoHeight }}px;
      }

      .fr-sidebar-nav {
      background-color: {{ theme.accountNavigationBackgroundColor || '#ffffff' }};
      }

      .fr-sidebar-wrapper .fr-sidebar-bottom {
      border-top-color: {{ theme.accountNavigationToggleBorderColor || '#e7eef4' }} !important;
      }

      #app .card,
      .modal-content,
      .modal-content .card,
      #app .dropdown-menu {
      background-color: {{ theme.accountCardBackgroundColor || '#ffffff' }};
      border: 1px solid {{ theme.accountCardOuterBorderColor || '#e7eef4' }};
      color: {{ theme.accountCardTextColor || '#5e6d82' }};
      box-shadow: rgb(0 0 0 / 13%) 0px 1px {{ theme.accountCardShadow !== undefined ? theme.accountCardShadow : 3 }}px;
      }

      #app .card .table {
      color: {{ theme.accountCardTextColor || '#5e6d82' }};
      }

      #app .card .list-group-item {
      background-color: {{ theme.accountCardBackgroundColor || '#ffffff' }};
      border: none;
      border-top: 1px solid;
      border-color: {{ theme.accountCardInnerBorderColor || '#e7eef4' }};
      }

      #app .card .list-group-flush {
      border: none;
      }

      #app .card h4,
      #app .card h5,
      #app .card .table.b-table > thead > tr {
      color: {{ theme.accountCardHeaderColor || '#23282e' }};
      }

      #app .card .card-header,
      #app .card .card-footer,
      #app .card .border-bottom,
      #app .card .border-top,
      #app .card .table td,
      #app .card .tabs .col-auto,
      .modal-content header,
      .modal-content footer {
      border-color: {{ theme.accountCardInnerBorderColor || '#e7eef4' }} !important;
      }

      #app .card .toolbar-divider {
      background-color: {{ theme.accountCardInnerBorderColor || '#e7eef4' }} !important;
      }

      #app .card input,
      #app .card .form-label-group .form-label-group-input input,
      #app .card .form-label-group .form-label-group-input .form-control,
      .form-label-group .form-label-group-input .multiselect .multiselect__tags,
      .form-label-group .form-label-group-input .multiselect .multiselect__element,
      .modal-content input,
      .modal-content .form-control,
      .modal-content .form-control .dropdown-menu ,
      .modal-content .b-dropdown .dropdown-menu {
      background-color: {{ theme.accountCardInputBackgroundColor || '#ffffff' }} !important;
      border-color: {{ theme.accountCardInputBorderColor || '#c0c9d5' }};
      color: {{ theme.accountCardInputTextColor || '#23282e' }};
      }

      .form-label-group .form-label-group-input .multiselect .multiselect__option--highlight,
      .form-label-group .form-label-group-input .multiselect .multiselect__option--selected {
      background-color: {{ theme.accountCardInputSelectColor || '#e4f4fd' }} !important;
      }

      .modal-content .input-group-text {
      border-color: {{ theme.accountCardInputBorderColor || '#c0c9d5' }};
      background-color: {{ theme.accountCardInputBackgroundColor || '#ffffff' }} !important;
      }

      #app .card .fr-tag-input {
      box-shadow: none;
      }

      #app .card .input-group-text,
      .form-label-group .form-label-group-input .multiselect .multiselect__select,
      .form-label-group .form-label-group-input .form-control {
      background-color: {{ theme.accountCardInputBackgroundColor || '#ffffff' }} !important;
      color: {{ theme.accountCardInputTextColor || '#23282e' }};
      }

      #app .multiselect .multiselect__select::before,
      #app .multiselect .multiselect__single,
      #app input::placeholder,
      .modal-content .multiselect .multiselect__input,
      .modal-content .multiselect .multiselect__input::placeholder,
      .modal-content label.form-control {
      color: {{ theme.accountCardInputTextColor || '#23282e' }};
      }

      .modal-content .white-label-background ~ label,
      #app .card .white-label-background ~ label {
      background-color: {{ theme.accountCardInputBackgroundColor || '#ffffff' }} !important;
      }

      #app .card label,
      .modal-content .fr-field label,
      .modal-content .form-control label .sr-only,
      .modal-content .form-label-group .form-label-group-input label,
      #app .card .input-group-text .text-muted,
      #app .card .fr-icon-input-holder .fr-icon,
      .form-label-group .material-icons-outlined,
      .form-control .material-icons-outlined {
      color: {{ theme.accountCardInputLabelColor || '#5e6d82' }};
      }

      #app .card .nav-pills .nav-link.active {
      background-color: {{ theme.accountCardTabActiveColor || '#e4f4fd' }};
      border-left-color: {{ theme.accountCardTabActiveBorderColor || '#109cf1' }};
      }

      #app .card .table-hover tbody tr:hover,
      #app .card .table tr.b-table-row-selected.table-transparent,
      #app .dropdown-item:hover,
      #app .nav-pills .nav-link:hover {
      background-color: {{ theme.accountTableRowHoverColor || '#f6f8fa' }} !important;
      }

      #app .fr-main-navbar {
      background-color: {{ theme.topBarBackgroundColor || '#ffffff' }};
      border-bottom-color: {{ theme.topBarBorderColor || '#e7eef4' }};
      }

      #app .fr-main-navbar .material-icons-outlined,
      #app .fr-main-navbar .fr-back-link h4,
      #app .fr-main-navbar .fr-dropdown-button-content div,
      #app .fr-main-navbar .dropdown-toggle::after {
      color: {{ theme.topBarTextColor || '#324054' }} !important;
      }

      #app .fr-main-navbar .fr-dropdown-button-content h5 {
      color: {{ theme.topBarHeaderColor || '#23282e' }};
      }
    </Component>
  </div>
</template>

<script>
/**
Theme properties examples:

accountCardBackgroundColor: "#ffffff",
accountCardHeaderColor: "#23282e",
accountCardInnerBorderColor: "#e7eef4",
accountCardInputBackgroundColor: '#ffffff',
accountCardInputBorderColor: '#c0c9d5',
accountCardInputLabelColor: '#5e6d82',
accountCardInputSelectColor: "#e4f4fd",
accountCardInputTextColor: '#23282e',
accountCardOuterBorderColor: "#e7eef4",
accountCardShadow: 3,
accountCardTabActiveColor: '#e4f4fd'
accountCardTabActiveBorderColor: '#109cf1'
accountCardTextColor: "#5e6d82",
accountNavigationBackgroundColor: "#ffffff",
accountNavigationTextColor: "#455469",
accountNavigationToggleBorderColor: "#e7eef4",
accountTableRowHoverColor: '#f6f8fa'
backgroundColor: "#312E2E"
buttonRounded: "15"
fontFamily: "Open Sans"
journeyCardBackgroundColor: "#ffffff"
journeyCardShadow: 3
journeyCardTextColor: "#5e6d82"
journeyCardTitleColor: "#23282e"
journeyInputBackgroundColor: "#ffffff"
journeyInputBorderColor: "#c0c9d5"
journeyInputLabelColor: "#5e6d82",
journeyInputSelectColor: "#e4f4fd",
journeyInputTextColor: "#23282e",
linkActiveColor: "#B20710"
linkColor: "#E50914"
logo: "URL"
logoProfile: "URL"
primaryColor: "#E50914"
// this is poorly named, it has turned into just the button text color
primaryOffColor: "#B20710"
profileBackgroundColor: "#D2CBCB"
profileMenuHighlightAccentColor: "#B20710"
profileMenuHighlightColor: "#E50914"
profileMenuHoverColor: "#109cf1",
profileMenuHoverTextColor: "#ffffff",
switchBackgroundColor: '#c0c9d5',
textColor: "#FFFFFF"
topBarBackgroundColor: "#ffffff",
topBarBorderColor: "#e7eef4",
topBarHeaderColor: "#23282e",
topBarTextColor: "#69788b",

 */
/**
 * Injects a style sheet based on provided theming variables.
 * Intended functionality is to allow for basic theming and overriding in
 * certain parts of the UI.
 */
export default {
  name: 'ThemeInjector',
  props: {
    /**
     * Is this component being used in enduser
     */
    isEnduser: {
      type: Boolean,
      default: false,
    },
    /**
     * Is this component being used in the Hosted Pages theme editor section
     */
    mock: {
      type: Boolean,
      default: false,
    },
    /**
     * Theme data
     */
    theme: {
      type: Object,
      default: () => ({ realm: {} }),
    },
  },
  computed: {
    backgroundColor() {
      let tempBackground = 'inherit';

      if (this.isEnduser && this.theme.profileBackgroundColor) {
        tempBackground = this.theme.profileBackgroundColor;
      } else if (this.theme.backgroundColor) {
        tempBackground = this.theme.backgroundColor;
      }

      return tempBackground;
    },
  },
};
</script>
