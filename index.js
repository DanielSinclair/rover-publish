
const core = require('@actions/core')
const exec = require('@actions/exec')
const artifact = require('@actions/artifact')
const path = require('path')

const downloadArtifact = async (name) => {
  const client = artifact.create()
  const options = { createArtifactFolder: false }
  await client.downloadArtifact(name, __dirname, options)
  return path.join(__dirname, `/${name}`)
}

const rover = async (args = []) => {
  const listeners = { }
  const options = { listeners }
  await exec.exec("/root/.rover/bin/rover", args, options)
}

const getInput = () => {
  const graph = core.getInput('graph')
  const variant = core.getInput('variant')
  const federated = core.getInput('federated')
  const subgraph = core.getInput('subgraph')
  if (federated && !subgraph) throw new Error('federated graph requires subgraph input')
  const path = core.getInput('path')
  const artifact = core.getInput('artifact')
  if (!path && !artifact) throw new Error('path or artifact inputs are required')
  const routingURL = core.getInput('routing_url')
  return { graph, variant, federated, subgraph, path, artifact, routingURL }
}

async function run() {
  try {
    const { graph, variant, federated, subgraph, path, artifact, routingURL } = getInput()
    const schema = artifact ? await downloadArtifact(artifact) : path
    const args = ['--schema', schema]
    if (federated) args.push('--name', subgraph)
    if (routingURL) args.push('--routing-url', routingURL)
    await rover([
      federated ? 'subgraph' : 'graph',
      'publish',
      `${graph}@${variant}`,
      ...args
    ])
  } catch (error) {
    console.error(error)
    core.setFailed(error.message)
  }
}

run()