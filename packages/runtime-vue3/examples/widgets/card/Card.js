const { h, resolveComponent } = Vue

const Card = {
  name: 'DcCard',

  setup(props, { slots }) {
    const ElCard = resolveComponent('el-card')

    return () => {
      return h(
        ElCard,
        {
          class: {
            'dc-card': true
          }
        },
        slots.default && slots.default()
      )
    }
  }
}

export { Card }
