<!-- Copyright (c) 2020-2022 ForgeRock. All rights reserved.

This software may be modified and distributed under the terms
of the MIT license. See the LICENSE file for details. -->
<script>
import {
  assign,
  get,
  mapKeys,
  omit,
  has,
  cloneDeep,
  endsWith,
  set,
} from 'lodash';

/**
 * @description Schema mixin used for filtering and mapping json schema information to be consumed by schema driven components such as FormGenerator.
 */
export default {
  name: 'SchemaMixin',
  methods: {
    /**
     * Combines two given schemas
     * @param {apiSchema} apiSchema schema obtained from backend
     * @param {uiSchema} uiSchema schema defined on frontend
     */
    combineSchemas(apiSchema, uiSchema) {
      return uiSchema.map((row) => row
        .map((formField) => {
          const clonedSchema = cloneDeep(apiSchema);
          const modelIsArrayElement = formField.model.endsWith('[0]');
          const modelName = modelIsArrayElement ? formField.model.substring(0, formField.model.length - 3) : formField.model;
          return assign(get(clonedSchema, modelName), formField);
        }));
    },
    /**
     * Takes current schema object and calculates all render types and collects all options for populating arrays
     * @param schema - current schema defined by AM
     */
    filterAndMapRawSchema(schema) {
      const newSchema = {};

      // The useful schema information is always stored under the 'properties' at the top level
      mapKeys(schema.properties, (propertyValue, propertyKey) => {
        newSchema[propertyKey] = this.filterAndMapSchemaProperty(propertyValue);
      });

      return newSchema;
    },
    /**
     * Determines if a schema property is nested
     * @param schemaProperty - the schema property to evaluate
     */
    isNestedProperty(schemaProperty) {
      if (!schemaProperty.properties) {
        return false;
      }

      const propertyKeys = Object.keys(schemaProperty.properties);
      if (propertyKeys.length === 2 && propertyKeys.includes('value') && propertyKeys.includes('inherited')) {
        return false;
      }
      return true;
    },
    /**
     * Recursively filters and maps a potentially nested json schema representation
     * of a field onto something that can be consumed by the FormGenerator component.
     * @param schemaProperty - the property to evaluate
     */
    filterAndMapSchemaProperty(schemaProperty) {
      // If the property is nested, recursively map sub properties
      if (this.isNestedProperty(schemaProperty)) {
        const newObj = {};
        mapKeys(schemaProperty.properties, (prop, name) => {
          newObj[name] = this.filterAndMapSchemaProperty(prop);

          if (newObj[name].required) {
            if (newObj.required && newObj.required.length) {
              newObj.required.push(name);
            } else {
              newObj.required = [name];
            }
          }
        });
        return newObj;
      }

      // if the property is not nested, map it directly
      return this.filterAndMapBaseLevelSchemaProperty(schemaProperty);
    },
    /**
     * Filters and maps a non-nested json schema field onto something that can be
     * consumed by the FormGenerator component.
     * @param prop - the property to evaluate
     */
    filterAndMapBaseLevelSchemaProperty(prop) {
      const mappedProp = omit(prop, ['propertyOrder', 'type', 'exampleValue', 'properties', 'options', 'inherited']);
      mappedProp.type = prop.properties && prop.properties.value && prop.properties.value.type ? prop.properties.value.type : '';

      const hasType = has(mappedProp, 'type');
      const hasEnumNames = has(mappedProp, 'enumNames');
      const hasItems = has(mappedProp, 'items');
      const hasEnumNamesInItems = hasItems && has(mappedProp.items, 'enumNames');
      const enumNamesLengthIs2 = hasEnumNames && mappedProp.enumNames.length === 2;

      if (!hasType) {
        mappedProp.type = prop.type || 'string';
      }

      // assign render type  and array subtype to schema object
      if (enumNamesLengthIs2) {
        mappedProp.type = 'radio';
        mappedProp.options = mappedProp.enumNames.map((text, index) => ({ text, value: mappedProp.enum[index] }));
        delete mappedProp.enum;
        delete mappedProp.enumNames;
      } else if (hasEnumNames) {
        mappedProp.arrayType = 'selectOne';
        mappedProp.type = 'array';
        mappedProp.options = mappedProp.enumNames.map((text, index) => ({ text, value: mappedProp.enum[index] }));
        delete mappedProp.enum;
        delete mappedProp.enumNames;
      } else if (hasEnumNamesInItems) {
        mappedProp.arrayType = 'selectMany';
        mappedProp.type = 'array';
        mappedProp.options = mappedProp.items.enumNames.map((text, index) => ({ text, value: mappedProp.items.enum[index] }));
        delete mappedProp.items;
      } else if (hasItems) {
        mappedProp.arrayType = 'addMany';
        mappedProp.type = 'array';
        mappedProp.options = [];
        delete mappedProp.items;
      }

      if (prop.properties && prop.properties.value && prop.properties.value.required === true) {
        mappedProp.required = true;
      }
      return mappedProp;
    },
    /**
     * Updates model using the value and path passed in obj.
     * This is used when updating values that are driven by schema.
     * @param {Object} obj - object containing property location as model and new value as value
     * @param {Object} model - object representing the current model data
     * @returns {Object} model with updated property values
     */
    setSchemaPropertyValue(obj, model) {
      const { value, path } = obj;
      const saveSchema = cloneDeep(model);
      let pathName = path;
      let valueToSet = value;

      // A model path ending with [0] indicates the backend is expecting an array
      // but we have presented a single value input to the user whose value should be stored as a single array entry
      if (endsWith(path, '[0]')) {
        // To get the correct location of the property to save we need to remove the '[0]' from the end of model
        pathName = path.substring(0, path.length - 3);
        valueToSet = [value];
      }

      const propertyExists = has(saveSchema, pathName);

      if (!propertyExists || endsWith(pathName, 'userpassword')) {
        set(saveSchema, pathName, valueToSet);
      } else {
        set(saveSchema, `${pathName}.value`, valueToSet);
      }
      return saveSchema;
    },
  },
};
</script>
