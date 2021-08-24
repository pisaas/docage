const { h } = Vue

const Html = {
  name: 'DcHtml',

  props: ['html'],

  setup(props, { slots }) {
    const c = Vue.compile(props.html)

    return () => {
      return h(c)
    }
  }
}

export { Html }
