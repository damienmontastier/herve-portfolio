<template>
  <nav class="nav-menu">
    <ul class="nav-menu-row">
      <li>
        <a class="nav-menu--link cursor-js" data-value="About">About</a>
      </li>
      <li>
        <a class="nav-menu--link cursor-js" data-value="Works">Works</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.nav-menu {
  position: fixed;
  top: 30px;
  left: 40px;
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
