<template>
  <div class="home">
    <div class="home-marquee left">
      <span v-for="i in 5" :key="i">Pluriel</span>
      <span v-for="i in 5" :key="i">Pluriel</span>
    </div>
    <div style="width: 100vw; display: flex; justify-content: center;" class="home-marquee">
      <span v-for="i in 7" :key="i">Pluriel</span>
    </div>
    <div class="home-marquee right">
      <span v-for="i in 5" :key="i">Pluriel</span>
      <span v-for="i in 5" :key="i">Pluriel</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  @keyframes marqueeAnimation {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  &-marquee {
    display: flex;
    white-space: nowrap;
    width: 100%;
    font-size: 248px;
    position: relative;
    width: 100%;
    font-family: 'Gandur', 'Source Sans Pro';
    text-transform: uppercase;
    -webkit-text-stroke: 1px #ffffff;
    color: transparent;
    transform: rotate(-5deg);

    span:after {
      content: '\00a0';
    }

    &.left span {
      animation: 50s marqueeAnimation infinite linear;
    }
    &.right span {
      animation: 50s marqueeAnimation infinite linear reverse;
    }
  }
}
</style>
