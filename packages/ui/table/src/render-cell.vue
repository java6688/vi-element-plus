<script lang="ts">
export default {
  name: "RenderCell",
  props: {
    render: {
      type: Function,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    return () => {
      const renderFn = props.render({ row: props.row });
      return typeof renderFn === "function" ? renderFn() : renderFn;
    };
  }
};
</script>
