<template>
  <div class="container">
    <div>
      <div class="marquee left">
        <span v-for="i in 5" :key="i">Hello</span>
        <span v-for="i in 5" :key="i">Hello</span>
      </div>
      <div class="marquee right">
        <span v-for="i in 5" :key="i">Hello</span>
        <span v-for="i in 5" :key="i">Hello</span>
      </div>

      <h1 class="title">herve-portfolio</h1>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Gandur', 'Source Sans Pro';
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

@keyframes marqueeAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

.marquee {
  display: flex;
  white-space: nowrap;
  width: 100%;
  font-size: 200px;
  position: relative;
  width: 100%;
  pointer-events: none;

  span:after {
    content: '\00a0';
  }

  &.left span {
    animation: 1s marqueeAnimation infinite linear;
  }
  &.right span {
    animation: 1s marqueeAnimation infinite linear reverse;
  }
}
</style>
