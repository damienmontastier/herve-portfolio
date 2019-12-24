export const state = () => ({
  projects: [],
  indexProject: 0,
  currentProject: { index: null, project: null },
  previousProject: { index: null, project: null },
  nextProject: { index: null, project: null }
})

export const mutations = {
  setProjects(state, list) {
    state.projects = list
  },
  setIndexProject(state) {
    if (state.indexProject === state.projects.length - 1) {
      state.indexProject = 0
    } else {
      state.indexProject++
    }
  },
  setCurrentProject(state) {
    let currentProject = {}
    let nextProject = {}
    let previousProject = {}

    Object.values(state.projects).find((project, index) => {
      if (state.indexProject === index) {
        currentProject = { index, project }
      } else if (state.indexProject === 0) {
        previousProject = {
          index: state.projects.length - 1,
          project: state.projects[state.projects.length - 1]
        }
        nextProject = {
          index: state.indexProject + 1,
          project: state.projects[state.indexProject + 1]
        }
      } else if (state.indexProject === state.projects.length - 1) {
        nextProject = {
          index: 0,
          project: state.projects[0]
        }
        previousProject = {
          index: state.indexProject - 1,
          project: state.projects[state.indexProject - 1]
        }
      } else if (index > state.indexProject) {
        nextProject = {
          index,
          project
        }
      } else if (index < state.indexProject) {
        previousProject = {
          index,
          project
        }
      }
    })

    state.currentProject = currentProject
    state.nextProject = nextProject
    state.previousProject = previousProject
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const files = await require.context(
      '~/assets/content/projects/',
      false,
      /\.json$/
    )
    const projects = files.keys().map(key => {
      const res = files(key)

      res.slug = key.slice(2, -5)

      return res
    })
    await commit('setProjects', projects)
    await commit('setCurrentProject')
  }
}
