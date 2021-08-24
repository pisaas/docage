const { h, resolveComponent } = Vue

const Nav = {
  name: 'DcNav',

  props: ['items'],

  setup(props, { slots }) {
    const ElMenu = resolveComponent('el-menu')
    const ElSubmenu = resolveComponent('el-submenu')
    const ElMenuItem = resolveComponent('el-menu-item')

    function renderMenu(item) {
      const attrs = _.omit(item, ['children', 'title'])

      if (!item.children || !item.children.length) {
        return h(ElMenuItem, { ...attrs }, item.title)
      }

      const children = item.children.map(it => {
        return renderMenu(it)
      })

      return h(
        ElSubmenu,
        {
          ...attrs
        },
        {
          default: children,
          title: item.title
        }
      )
    }

    const subMenu = props.items.map(it => {
      return renderMenu(it)
    })

    return () => {
      return h(
        ElMenu,
        {
          class: {
            'dc-nav': true
          }
        },
        subMenu
      )
    }
  }
}

export { Nav }
