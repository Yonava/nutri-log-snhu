import { mount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'

describe('HomePage.vue', () => {
  it('renders tab 1 Tab1Page', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Home Page')
  })
})
