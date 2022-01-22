# Workflow Failure History

This action provides the number of failures since the last success for a specific workflow.

## Inputs

## `token`

**Required** The token with authorization to access previous runs for the desired workflow.

## `owner`

**Required** The GitHub username of the owner of the repository containing the workflow.

## `repo`

**Required** The name of the repository containing the workflow.

## `workflow_id`

**Required** The ID or filename of the workflow.

## Outputs

## `failures`

The number of failures since the last success for all the workflow runs.

## Example usage
```
uses: TopazJ/workflow-failure-history@v1.0
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  owner: TopazJ
  repo: integration-action-test
  workflow_id: e2e_test.yml
```