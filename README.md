# Apollo Rover Publish Action

A GitHub Action to publish a schema to Apollo Studio using the Apollo [Rover CLI](https://www.apollographql.com/docs/rover/).

## inputs
| name        | default | required               |
| :---------- | :------ | :--------------------- |
| graph       |         | yes                    |
| variant     | current | no                     |
| federated   | false   | no                     |
| subgraph    |         | no, if federated false |
| schema      |         | yes                    |
| routing_url |         | only for first publish |

## Usage
```
jobs:
  publisj:
    runs-on: ubuntu-latest
    steps:
    - uses: danielsinclair/rover-publish-action@v1
      with:
        graph: APOLLO_GRAPH_ID
        federated: true
        subgraph: products
        schema: ./products.graphql
      env:
        APOLLO_KEY: ${{ secrets.APOLLO_KEY }}
```