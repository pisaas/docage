const { h, resolveComponent } = Vue

const Col = {
  name: 'DcCol',

  setup(props, { slots }) {
    const ElCol = resolveComponent('el-col')

    return () => {
      return h(
        ElCol,
        {
          class: {
            'dc-col': true
          }
        },
        slots.default && slots.default()
      )
    }
  }
}

export { Col }
