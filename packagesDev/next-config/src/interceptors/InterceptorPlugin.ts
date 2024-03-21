import path from 'path'
import { Compiler } from 'webpack'
import { GraphCommerceConfig } from '../generated/config'
import { ResolveDependency, resolveDependency } from '../utils/resolveDependency'
import { findPlugins } from './findPlugins'
import { generateInterceptors, GenerateInterceptorsReturn } from './generateInterceptors'
import { writeInterceptors } from './writeInterceptors'

export class InterceptorPlugin {
  private interceptors: GenerateInterceptorsReturn

  private interceptorByDepependency: GenerateInterceptorsReturn

  private resolveDependency: ResolveDependency

  constructor(private config: GraphCommerceConfig) {
    this.resolveDependency = resolveDependency()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [plugins, errors] = findPlugins(this.config)
    this.interceptors = generateInterceptors(plugins, this.resolveDependency, this.config.debug)
    this.interceptorByDepependency = Object.fromEntries(
      Object.values(this.interceptors).map((i) => [i.dependency, i]),
    )

    writeInterceptors(this.interceptors)
  }

  apply(compiler: Compiler): void {
    const logger = compiler.getInfrastructureLogger('InterceptorPlugin')

    // After the compilation has succeeded we watch all possible plugin locations.
    compiler.hooks.afterCompile.tap('InterceptorPlugin', (compilation) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [plugins, errors] = findPlugins(this.config)

      plugins.forEach((p) => {
        const resolved = this.resolveDependency(p.sourceModule)
        if (resolved) {
          const absoluteFilePath = `${path.join(process.cwd(), resolved.fromRoot)}.tsx`
          compilation.fileDependencies.add(absoluteFilePath)
        }
      })

      this.interceptors = generateInterceptors(plugins, this.resolveDependency, this.config.debug)
      this.interceptorByDepependency = Object.fromEntries(
        Object.values(this.interceptors).map((i) => [i.dependency, i]),
      )
      writeInterceptors(this.interceptors)
    })

    compiler.hooks.normalModuleFactory.tap('InterceptorPlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('InterceptorPlugin', (resource) => {
        const issuer = resource.contextInfo.issuer ?? ''

        const requestPath = path.relative(
          process.cwd(),
          path.resolve(resource.context, resource.request),
        )

        const split = requestPath.split('/')
        const searchFor = `${split[split.length - 1]}.interceptor.tsx`

        if (issuer.endsWith(searchFor) && this.interceptors[requestPath]) {
          console.log(`Interceptor ${issuer} is requesting the original ${requestPath}`)
          return
        }

        const interceptorForRequest = this.interceptorByDepependency[resource.request]
        if (interceptorForRequest) {
          resource.request = `${interceptorForRequest.denormalized}.interceptor.tsx`
          console.log(`Intercepting dep... ${interceptorForRequest.dependency}`, resource.request)
        }

        const interceptorForPath = this.interceptors[requestPath]
        if (interceptorForPath) {
          resource.request = `${resource.request}.interceptor.tsx`
          console.log(`Intercepting fromRoot... ${interceptorForPath.dependency}`, resource.request)
        }
      })
    })
  }
}
