<template>
  <div class="home">
    <div class="home-marquee left">
      <span v-for="i in 5" :key="i">Pluriel</span>
      <span v-for="i in 5" :key="i">Pluriel</span>
    </div>
    <div style class="home-marquee home-marquee-middle">
      <span class="home-marquee-middle-left" v-for="i in 3" :key="i">Pluriel</span>
      <div class="home-marquee-middle-center">
        <span class="middle--left">Interactive site</span>
        <span class="middle--center">Pluriel</span>
        <span class="middle--right">Interactive site</span>
      </div>
      <span class="home-marquee-middle-right" v-for="i in 3" :key="i">Pluriel</span>
    </div>
    <div class="home-marquee right">
      <span v-for="i in 5" :key="i">Pluriel</span>
      <span v-for="i in 5" :key="i">Pluriel</span>
    </div>
    <div class="home-pagination">
      <div class="home-pagination--current">01</div>
      <span></span>
      <div class="home-pagination--total">04</div>
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

    span::after {
      content: '\00a0';
    }

    &-middle {
      display: flex;
      justify-content: center;

      &-left {
        &::after {
          content: '' !important;
        }
        &::before {
          content: '\00a0';
        }
      }

      &-right {
        &::after {
          content: '\00a0';
        }
        &::before {
          content: '' !important;
        }
      }

      &-center {
        position: relative;
        margin: 0 60px;

        span::after {
          content: '' !important;
        }
        .middle {
          &--left,
          &--right {
            font-family: 'Manrope';
            font-weight: 200;
            font-size: 12px;
            position: absolute;
            transform: rotate(-90deg);
            top: 50%;
          }
          &--left {
            left: calc(-50px - 25px);
          }
          &--right {
            right: calc(-50px - 25px);
          }
          &--center {
            -webkit-text-stroke: transparent;
            color: white;
          }
        }
      }
    }

    &.left span {
      animation: 50s marqueeAnimation infinite linear;
    }
    &.right span {
      animation: 50s marqueeAnimation infinite linear reverse;
    }
  }
  &-pagination {
    position: fixed;
    bottom: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    font-family: 'Manrope';
    color: white;
    font-size: 14px;

    &--current {
      font-weight: 900;
    }
    &--total {
      font-weight: 200;
    }

    span {
      width: 40px;
      height: 1px;
      background: white;
      margin: 0 10px;
    }
  }
}

@keyframes marqueeAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
