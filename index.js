const core = require('@actions/core');
const { Octokit } = require("@octokit/core");

try {
    const token = core.getInput('token');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const workflow_id = core.getInput('workflow_id');

    const octokit = new Octokit({ auth: token });

    let parsed_runs = 0;
    let success = false;
    let failures = 0;
    let page = 1;

    do {
        let { data } = octokit.request('GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs?page='+page, {
            owner: owner,
            repo: repo,
            workflow_id: workflow_id,
        });
        page++;
        
        for (let i = 0; i < data.workflow_runs.length; i++)
        {
            parsed_runs++;
            if (data.workflow_runs[i].conclusion === "success")
            {
                success = true;
                break;
            }
            if (data.workflow_runs[i].conclusion === "failure")
            {
                failures++;
            }
        }
        if (parsed_runs === data.total_count)
        {
            success = true;
        }
    } while (!success);
    console.log("Discovered " + failures + " failures since the last success.");
    core.setOutput("failures", failures);
} catch (error) {
    core.setFailed(error.message);
}