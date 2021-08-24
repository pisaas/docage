const { h } = Vue

const Wrapper = {
  name: 'DcWrapper',

  setup(props, { slots }) {
    return () => {
      return h(
        'div',
        {
          class: {
            'dc-wrapper': true
          }
        },
        slots.default && slots.default()
      )
    }
  }
}

export { Wrapper }
