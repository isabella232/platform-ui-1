/**
 * Copyright (c) 2020-2022 ForgeRock. All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { shallowMount } from '@vue/test-utils';
import MarkdownEditor from './index';

describe('MarkdownEditor', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MarkdownEditor, {
      mocks: {
        $t: () => {},
      },
      propsData: {
        styles: '',
        isMarkdown: true,
      },
    });
  });

  it('MarkdownEditor successfully loaded', () => {
    expect(wrapper.name()).toEqual('MarkdownEditor');
  });
});
