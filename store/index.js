export const state = () => ({
  projects: [],
  currentProject: 0,
  previousProject: null,
  nextProject: null
})

export const mutations = {
  setProjects(state, list) {
    state.projects = list
  },
  setCurrentProject(state, index) {
    state.currentProject = index
  },
  setNextProject(state, index) {
    console.log(index)
    state.nextProject = index
  },
  setPreviousProject(state, index) {
    state.previousProject = index
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
  }
}
