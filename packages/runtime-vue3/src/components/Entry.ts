import { h } from 'vue'

import { Widget } from './Widget'

const Entry = {
  components: { Widget },

  props: {
    schema: {
      type: Object,
      default: () => ({})
    }
  },

  provide() {
    return {
      entry: this
    }
  },

  setup(props: any) {
    const { schema } = props

    return () => {
      return h(
        'div',
        {
          class: {
            'dc-entry': true
          }
        },
        h(Widget, { schema })
      )
    }
  }
}

export { Entry }
