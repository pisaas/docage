const { defineComponent } = vue

const Widget = defineComponent({
  template: `
    <div class="widget">
      <slot>widget</slot>
    </div>
  `
})

export { Widget }
