const { h, resolveComponent } = Vue

const Page = {
  name: 'DcPage',

  setup(props, { slots }) {
    const ElRow = resolveComponent('el-row')
    const ElCol = resolveComponent('el-col')

    return () => {
      const aside = slots.aside && slots.aside()
      const asideSpan = aside ? 6 : 0
      const bodySpan = 24 - asideSpan
      return h(
        'div',
        {
          class: {
            'dc-page': true
          }
        },
        h(ElRow, {}, [
          h(
            ElCol,
            {
              class: 'dc-page--aside',
              span: asideSpan
            },
            aside
          ),
          h(
            ElCol,
            {
              class: 'dc-page--body',
              span: bodySpan
            },
            slots.default && slots.default()
          )
        ])
      )
    }
  }
}

export { Page }
