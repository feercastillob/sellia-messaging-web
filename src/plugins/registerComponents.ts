import type { App } from 'vue'

export function registerGlobalComponents(app: App) {
  const components = import.meta.glob('../components/**/*.vue', { eager: true })

  for (const path in components) {
    const component: any = components[path]
    const name = path.split('/').pop()?.replace('.vue', '') ?? ''
    app.component(name, component.default)
  }
}
