<template>
  <div class="cursor">
    <svg class="arrow" width="27" height="42" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFF" fill-rule="evenodd">
        <path d="M12.075 0h3v38h-3z" />
        <path d="M24.879 26.575L27 28.697l-13.16 13.2-2.122-2.122z" />
        <path d="M2.197 26L.076 28.122 12.804 40.85l2.12-2.122z" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cursor {
  height: 100px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #5061ee 0%, #9d50f3 99%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
</style>
