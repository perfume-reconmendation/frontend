<template>
  <div class="home">
    <section class="hero is-primary is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="">
          <p class="title">
            Fullheight hero
          </p>
          <p class="subtitle">
            Fullheight subtitle
          </p>
          <router-link to="/test" class="button is-outlined is-medium">Outlined</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  name: 'Home',
  components: {

  }
}
</script>
