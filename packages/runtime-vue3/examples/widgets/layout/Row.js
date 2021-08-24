const { h, resolveComponent } = Vue

const Row = {
  name: 'DcRow',

  setup(props, { slots }) {
    const ElRow = resolveComponent('el-row')

    return () => {
      return h(
        ElRow,
        {
          class: {
            'dc-row': true
          }
        },
        slots.default && slots.default()
      )
    }
  }
}

export { Row }
