<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { api } from "@/api";
import { dispatchLogInCode } from "@/store/main/actions";

@Component
export default class Login extends Vue {
  mounted() {
    dispatchLogInCode(this.$store, {
      code: this.$router.currentRoute.params.code,
    });
  }
}
</script>

<style>
</style>
