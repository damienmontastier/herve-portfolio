<template>
  <nav class="nav-menu">
    <ul>
      <li>
        <a>About</a>
      </li>
      <li>
        <a>Works</a>
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

      &:first-child {
        margin-right: 20px;
      }
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
}
</style>
