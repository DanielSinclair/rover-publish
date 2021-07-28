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

## outputs
| name   | description                |
| :----- | :------------------------- |
| schema | base64 encoded fetched SDL |

## Usage
```
jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
    - uses: danielsinclair/rover-publish-action@v1
      with:
        graph: APOLLO_GRAPH_ID
        federated: true
        subgraph: products
        schema: ./test/products.graphql
      env:
        APOLLO_KEY: ${{ secrets.APOLLO_KEY }}
```