
const core = require('@actions/core')
const exec = require('@actions/exec')

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
  const schema = core.getInput('schema')
  const routingURL = core.getInput('routing_url')
  if (federated && !subgraph) throw new Error('federated graph requires subgraph input')
  return { graph, variant, federated, subgraph, schema, routingURL }
}

async function run() {
  try {
    const { graph, variant, federated, subgraph, schema, routingURL } = getInput()
    const args = ['--schema', schema]
    if (federated) args.push(['--name', subgraph])
    if (routingURL) args.push(['--routing-url', routingURL])
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