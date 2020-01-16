<template>
  <nav class="nav-menu">
    <ul class="nav-menu-row">
      <li class="cursor-js">
        <nuxt-link class="nav-menu--link" data-value="Home" to="/">Home</nuxt-link>
      </li>
      <li class="cursor-js">
        <nuxt-link class="nav-menu--link" data-value="About" to="/about">About</nuxt-link>
      </li>
      <li class="cursor-js">
        <a class="nav-menu--link" data-value="Works">Works</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Cursor from '@/assets/js/Cursor'

export default {
  mounted() {
    Cursor.add()
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  position: absolute;
  top: 30px;
  left: 40px;
  z-index: 999;

  ul {
    display: inline-flex;
    li {
      font-size: 12px;
      font-family: 'Manrope';
      text-transform: uppercase;
      overflow: hidden;

      &:hover {
        a {
          transform: translateY(-100%);
        }
      }

      &:first-child {
        margin-right: 20px;
      }
      a {
        text-decoration: none;
        color: white;
        position: relative;
        display: block;
        transition: transform 0.2s ease-out;

        &:after {
          content: attr(data-value);
          position: absolute;
          top: 100%;
          left: 0;
        }
      }
    }
  }
}
</style>
