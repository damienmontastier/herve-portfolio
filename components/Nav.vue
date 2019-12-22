<template>
  <nav class="nav-menu">
    <ul>
      <li>
        <a href="bikes">About</a>
      </li>
      <li>
        <a href="bikes">Works</a>
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
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>
