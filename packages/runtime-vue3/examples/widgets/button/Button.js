const { h, resolveComponent } = Vue

const Button = {
  name: 'DcButton',

  setup(props, { slots }) {
    const ElButton = resolveComponent('el-button')

    return () => {
      return h(
        ElButton,
        {
          class: {
            'dc-button': true
          }
        },
        (slots.default && slots.default()) || '按钮'
      )
    }
  }
}

export { Button }
