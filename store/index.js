export const state = () => ({
  projects: [],
  currentProject: { index: 0 },
  previousProject: { index: null },
  nextProject: { index: null }
})

export const mutations = {
  setProjects(state, list) {
    state.projects = list
  },
  setCurrentProject(state, index) {
    state.currentProject.index = index
  },
  setNextProject(state, index) {
    state.nextProject.index = index
  },
  setPreviousProject(state, index) {
    state.previousProject.index = index
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const files = await require.context('~/assets/content/projects/', false, /\.json$/)
    const projects = files.keys().map(key => {
      const res = files(key)

      res.slug = key.slice(2, -5)

      return res
    })
    await commit('setProjects', projects)
    await commit('setCurrentProject', 0)
  }
}
