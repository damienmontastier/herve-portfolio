export const state = () => ({
  projects: []
})

export const mutations = {
  setProjects(state, list) {
    state.projects = list
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const files = await require.context(
      '~/assets/content/projects/',
      false,
      /\.json$/
    )
    const projects = files.keys().map((key) => {
      const res = files(key)

      res.slug = key.slice(2, -5)

      return res
    })
    await commit('setProjects', projects)
  }
}
