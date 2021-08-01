const { defineComponent } = vue

const Root = defineComponent({
  template: `
    <div class="root">
      <slot>Root</slot>
    </div>
  `
})

export { Root }
