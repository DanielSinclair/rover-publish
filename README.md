# Apollo Rover Publish Action

A GitHub Action to publish a schema to Apollo Studio using the Apollo [Rover CLI](https://www.apollographql.com/docs/rover/).

Works in tandem with:
- [rover-fetch](https://github.com/DanielSinclair/rover-fetch)
- [rover-introspect](https://github.com/DanielSinclair/rover-introspect)

## inputs
| name        | default | required               |
| :---------- | :------ | :--------------------- |
| graph       |         | yes                    |
| variant     | current | no                     |
| federated   | false   | no                     |
| subgraph    |         | no, if federated false |
| path        |         | no                    |
| artifact    |         | no                  |
| routing_url |         | only for first publish |

## Usage
```
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: danielsinclair/rover-publish@v1
      with:
        graph: APOLLO_GRAPH_ID
        federated: true
        subgraph: products
        artifact: products.graphql
      env:
        APOLLO_KEY: ${{ secrets.APOLLO_KEY }}
```