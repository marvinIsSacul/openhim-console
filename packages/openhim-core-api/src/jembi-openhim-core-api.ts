import axios from 'axios'

/* if running locally set REACT_APP_OPENHIM_API_BASE_URL environment variable to point to OpenHIM Core API
For example  https://localhost:8080/
*/

const API_URL =
  process.env.REACT_APP_OPENHIM_API_BASE_URL || 'https://localhost:8080/'
if (!API_URL) {
  throw new Error('REACT_APP_OPENHIM_API_BASE_URL is not set')
}

interface App {
  _id: string
  name: string
  description: string
  icon: string
  type: string
  category: string
  access_roles: string[]
  url: string
  showInPortal: boolean
  showInSideBar: boolean
  __v: number
}

// Anything exported from this file is importable by other in-browser modules.

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

export async function fetchApps(): Promise<App[]> {
  const response = await apiClient.get('/apps')
  /* filter out apps that are not to be shown in the portal */
  const portalApps = response.data.filter(app => app.showInPortal)
  return portalApps
}

export async function getAllApps(): Promise<App[]> {
  const response = await apiClient.get('/apps')
  return response.data
}

export async function fetchApp(id): Promise<App> {
  const response = await apiClient.get(`/apps/${id}`)
  return response.data
}

async function editApp(id, data): Promise<App> {
  const response = await apiClient.put(`/apps/${id}`, data)
  return response.data
}

export {editApp}

async function deleteApp(id) {
  const response = await apiClient.delete(`/apps/${id}`)
  return response.data
}

export {deleteApp}

async function fetchCategories() {
  const response = await apiClient.get('/apps')
  const categories = Array.from(new Set(response.data.map(app => app.category)))
  return categories
}
export {fetchCategories}

async function fetchAppsByCategory(category) {
  const response = await apiClient.get('/apps')
  const apps = response.data.filter(app => app.category === category)
  return apps
}
export {fetchAppsByCategory}

async function fetchAppsGroupedByCategory() {
  const response = await apiClient.get('/apps')
  const categories = Array.from(new Set(response.data.map(app => app.category)))
  const appsGroupedByCategory = categories.map(category => {
    const apps = response.data.filter(app => app.category === category)
    return {category, apps}
  })
  return appsGroupedByCategory
}
export {fetchAppsGroupedByCategory}

async function addApp(app: any) {
  const response = await apiClient.post('/apps', app)
  return response.data
}
export {addApp}
