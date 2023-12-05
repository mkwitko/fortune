/* eslint-disable @typescript-eslint/no-var-requires */
// cli.js
const fs = require('fs-extra')
const path = require('path')
const yargs = require('yargs')

const generateEntityContent = (className) => {
  return `import CoreEntity from '../Core/Core'
import ${className}Hook from './hooks/${className}Hook'
import { HttpMethods } from './methods'

export default class ${className} extends CoreEntity {
  constructor() {
    super({
        collection: '${className.replace('Entity', '')}',
    })
  }

  public getMethods = HttpMethods.GET
  public putMethods = HttpMethods.PUT
  public postMethods = HttpMethods.POST
  public deleteMethods = HttpMethods.DELETE

  public hook = ${className}Hook()
}
`
}

const generateContext = (className) => {
  return `import React, { useContext, useEffect } from 'react'

    import Entities from '@/entities'
    import ${className} from '@/entities/${className}/${className}'
    
    interface ${className}ContextProps {
    ${className.replace('Entity', '')}: ${className}
    }
    
    const ${className}Context = React.createContext({} as ${className}ContextProps)
    
    export function ${className}ContextProvider({
      children,
    }: {
      children: React.ReactNode
    }) {
      const entities = Entities()
      const {
        ${className.replace('Entity', '')},
      }: {
        ${className.replace('Entity', '')}: ${className}
      } = entities
    
      useEffect(() => {
        // TODO: Add logic here
      }, [])
    
      return (
        <${className}Context.Provider
          value={{
            ${className.replace('Entity', '')},
          }}
        >
          {children}
        </${className}Context.Provider>
      )
    }
    
    export const use${className}Context = () => {
      const context = useContext(${className}Context)
    
      return context
    }
    `
}

const generateHookContent = (className) => {
  return `import React from 'react'

export default function ${className}Hook() {
const [data, setData] = React.useState(null)
  
return { data, setData }
}
`
}

const generateMethodsContent = () => {
  return `export const HttpMethods = {
    POST: null,
    GET: null,
    PUT: null,
    DELETE: null,
  } as const
  `
}

const generateTypes = () => {
  return `// Types here`
}

const generateFiles = async (filename) => {
  const className = `${filename}Entity`

  const entityContent = generateEntityContent(className)
  const entityFolder = path.join('src/entities', className)
  const entityFilename = path.join(entityFolder, `${className}.tsx`)

  const contextContent = generateContext(className)
  const contextFolder = path.join('src/context')
  const contextFilename = path.join(contextFolder, `${className}Context.tsx`)

  const hookContent = generateHookContent(className)
  const hookFolder = path.join('src/entities', className, '/hooks')
  const hookFilename = path.join(hookFolder, `${className}Hook.tsx`)

  const methodsContent = generateMethodsContent()
  const methodsFolder = path.join('src/entities', className, '/methods')
  const methodsFilename = path.join(methodsFolder, `index.ts`)

  const typesContent = generateTypes()
  const typesFolder = path.join('src/entities', className, '/@types')
  const typesFilename = path.join(typesFolder, `${className}Types.ts`)

  try {
    // Ensure the directory exists
    await fs.ensureDir(entityFolder)
    await fs.ensureDir(contextFolder)
    await fs.ensureDir(hookFolder)
    await fs.ensureDir(methodsFolder)
    await fs.ensureDir(typesFolder)

    await fs.writeFile(entityFilename, entityContent)
    console.log(`Entity file "${entityFilename}" successfully generated.`)

    await fs.writeFile(contextFilename, contextContent)
    console.log(`Entity file "${contextFilename}" successfully generated.`)

    await fs.writeFile(hookFilename, hookContent)
    console.log(`Hook file "${hookFilename}" successfully generated.`)

    await fs.writeFile(methodsFilename, methodsContent)
    console.log(`Hook file "${methodsFilename}" successfully generated.`)

    await fs.writeFile(typesFilename, typesContent)
    console.log(`Hook file "${typesFilename}" successfully generated.`)
  } catch (err) {
    console.error('Error generating the files:', err)
  }
}

const argv = yargs
  .option('filename', {
    alias: 'f',
    description: 'Specify the filename (without extension)',
    type: 'string',
    demandOption: true,
  })
  .help().argv

generateFiles(argv.filename)

const entitiesDir = 'src/entities'
const indexFile = 'src/entities/index.ts'
const contextWrapperFile = 'src/context/index.tsx'

const generateEntitiesFunction = (entityNames) => {
  const imports = entityNames
    .map(
      (entityName) =>
        `import ${entityName} from './${entityName}/${entityName}';`,
    )
    .join('\n')
  const instantiations = entityNames
    .map(
      (entityName) =>
        `const ${entityName.replace(/Entity$/, '')} = new ${entityName}();`,
    )
    .join('\n')

  const instantiationsToReturn = entityNames
    .map((entityName) => `${entityName.replace(/Entity$/, '')}`)
    .join(',\n')

  return `
${imports}

export default function Entities() {
${instantiations}

return {
    ${instantiationsToReturn}
}
}
`
}

const generateContextWrapperFunction = (entityNames) => {
  const imports = entityNames
    .map(
      (entityName) =>
        `import { ${entityName}ContextProvider } from './${entityName}Context';`,
    )
    .join('\n')

  const instantiationsToReturnFirst = entityNames
    .map((entityName) => `<${entityName}ContextProvider>`)
    .join('\n')

  const instantiationsToReturnSecond = entityNames
    .reverse()
    .map((entityName) => `</${entityName}ContextProvider>`)
    .join('\n')

  return `
  ${imports}
  
  export default function ContextWrapper({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        ${instantiationsToReturnFirst}
        {children}
        ${instantiationsToReturnSecond}
    )
  }
  `
}

const updateIndexFile = (content) => {
  fs.writeFileSync(indexFile, content)
  console.log(`Updated ${indexFile} successfully.`)
}

const updateContextWrapperFile = (content) => {
  fs.writeFileSync(contextWrapperFile, content)
  console.log(`Updated ${contextWrapperFile} successfully.`)
}

const findEntities = () => {
  try {
    const files = fs.readdirSync(entitiesDir)
    const entityNames = files
      .filter((file) => file.endsWith('Entity'))
      .map((file) => file.replace(/Entity\.tsx$/, ''))

    const entitiesFunction = generateEntitiesFunction(entityNames)
    const contextWrapperFunction = generateContextWrapperFunction(entityNames)
    updateIndexFile(entitiesFunction)
    updateContextWrapperFile(contextWrapperFunction)
  } catch (error) {
    console.error('Error finding entities:', error)
  }
}

findEntities()
