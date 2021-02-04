import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).to.include(msg)
//   })
// })

import AsideMenu from '@/components/AsideMenu.vue';
describe("AsideMenu.vue", () => {
  it('renders props.isCollapse when passed', () => {
    const isCollapse = false;
    const wrapper = shallowMount(AsideMenu, {
      props: { isCollapse }
    })

    expect(wrapper.text()).to.include(isCollapse);
  })
})