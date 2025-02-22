<!-- Copyright (c) 2020-2021 ForgeRock. All rights reserved.

This software may be modified and distributed under the terms
of the MIT license. See the LICENSE file for details. -->
<template>
  <div>
    <div class="card-body m-4">
      <ValidationObserver ref="observer">
        <template v-for="(field, index) in displayProperties">
          <div
            v-if="(field.type === 'string' || field.type === 'number' || field.type === 'boolean') && field.encryption === undefined"
            class="mb-4"
            :key="'editResource' + index">
            <FrField
              v-model="field.value"
              :disabled="field.disabled"
              :description="field.type !== 'boolean' ? field.description : ''"
              :label="field.title"
              :name="field.key"
              :options="field.options"
              :type="field.format ? field.format : field.type"
              :validation="field.validation" />
          </div>

          <FrListField
            v-else-if="field.type === 'array' && field.key !== 'privileges' && !field.items.isRelationship"
            v-model="field.value"
            v-on="$listeners"
            :key="'editResource' + index"
            :description="field.description"
            :index="index"
            :items="field.items"
            :label="field.title"
            :name="field.key"
            :required="field.required"
            @input="updateField(index, $event)" />

          <div
            v-if="field.type === 'relationship'"
            class="mb-4"
            :key="'editResource' + index">
            <FrRelationshipEdit
              class="mb-4"
              v-if="field.type === 'relationship'"
              :disabled="field.disabled"
              :relationship-property="field"
              :index="index"
              v-model="field.value"
              @setValue="setSingletonRelationshipValue($event, field)" />
          </div>
        </template>
      </ValidationObserver>
    </div>
    <div class="card-footer">
      <div class="float-right mb-4">
        <BButton
          :disabled="disableSaveButton"
          @click="saveResource"
          variant="primary">
          {{ $t('common.save') }}
        </BButton>
      </div>
    </div>
  </div>
</template>

<script>

import {
  camelCase,
  cloneDeep,
  startCase,
} from 'lodash';
import {
  BButton,
} from 'bootstrap-vue';
import { ValidationObserver } from 'vee-validate';
import FrField from '@forgerock/platform-shared/src/components/Field';
import FrRelationshipEdit from '@forgerock/platform-shared/src/components/resource/RelationshipEdit';
import FrListField from '@forgerock/platform-shared/src/components/ListField';
import NotificationMixin from '@forgerock/platform-shared/src/mixins/NotificationMixin';
import RestMixin from '@forgerock/platform-shared/src/mixins/RestMixin';
import ResourceMixin from '@forgerock/platform-shared/src/mixins/ResourceMixin';
import ListsMixin from '@forgerock/platform-shared/src/mixins/ListsMixin';

export default {
  name: 'ObjectTypeEditor',
  components: {
    FrField,
    FrRelationshipEdit,
    FrListField,
    ValidationObserver,
    BButton,
  },
  props: {
    revision: {
      type: String,
      default: '',
    },
    displayProperties: {
      type: Array,
      default: () => [],
    },
    formFields: {
      type: Object,
      default: () => {},
    },
    resourcePath: {
      type: String,
      default: '',
    },
    disableSaveButton: {
      type: Boolean,
      default: false,
    },
    isOpenidmAdmin: {
      type: Boolean,
      default: false,
    },
    resourceTitle: {
      type: String,
      default: '',
    },
    subPropertyName: {
      type: String,
      default: null,
      required: false,
    },
  },
  mixins: [
    ListsMixin,
    NotificationMixin,
    ResourceMixin,
    RestMixin,
  ],
  data() {
    return {
      oldFormFields: {},
    };
  },
  watch: {
    displayProperties: {
      immediate: true,
      deep: true,
      handler() {
        this.loadData();
      },
    },
  },
  mounted() {
    this.oldFormFields = cloneDeep(this.formFields);
  },
  methods: {
    loadData() {
      // make sure display properties have a title
      this.displayProperties.forEach((displayProperty) => {
        const hasTitle = displayProperty.title && displayProperty.title.length > 0;
        const hasDescription = displayProperty.description && displayProperty.description.length > 0;

        if (!hasTitle && hasDescription) {
          displayProperty.title = displayProperty.description;
        } else if (!hasTitle && !hasDescription) {
          // best effort to create a title when none is provided
          displayProperty.title = startCase(camelCase(displayProperty.key));
        }
      });
    },
    setSingletonRelationshipValue(value, field) {
      field.value = value;
    },
    async saveResource() {
      const idmInstance = this.getRequestService({
        headers: {
          'if-match': this.revision,
        },
      });

      this.$refs.observer.reset();

      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        let saveData;

        this.displayProperties.forEach((field) => {
          if (field.value !== null) {
            this.formFields[field.key] = field.value;
          }
        });

        if (this.subPropertyName) {
          const originalSubProp = {};
          const newSubProp = {};

          originalSubProp[this.subPropertyName] = cloneDeep(this.oldFormFields);
          newSubProp[this.subPropertyName] = cloneDeep(this.formFields);

          saveData = this.generateUpdatePatch(originalSubProp, newSubProp);
        } else {
          saveData = this.generateUpdatePatch(cloneDeep(this.oldFormFields), cloneDeep(this.formFields));
        }

        idmInstance.patch(this.resourcePath, saveData).then(() => {
          const resourceName = this.resourceTitle ? this.resourceTitle : this.resourcePath.split('/')[1];
          this.oldFormFields = cloneDeep(this.formFields);
          this.$emit('refresh-data');
          this.displayNotification('IDMMessages', 'success', this.$t('pages.access.successEdited', { resource: resourceName }));
        },
        (error) => {
          const generatedErrors = this.findPolicyError(error.response, this.displayProperties);

          this.$refs.observer.reset();

          if (generatedErrors.length > 0) {
            generatedErrors.forEach((generatedError) => {
              if (generatedError.exists) {
                const newError = {};
                newError[generatedError.field] = [generatedError.msg];
                this.$refs.observer.setErrors(newError);
              }
            });
          }

          this.showErrorMessage(error, this.$t('pages.access.invalidEdit'));
        });
      } else {
        this.displayNotification('IDMMessages', 'error', this.$t('pages.access.invalidEdit'));
      }
    },
    updateField(index, newValue) {
      this.displayProperties[index].value = newValue;
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.error-state {
  border: 1px solid $red;
}
</style>
