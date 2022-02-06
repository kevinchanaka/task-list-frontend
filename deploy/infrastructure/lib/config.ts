export const ENV = {account: '436501147244', region: 'ap-southeast-2'};

export const SOURCE_REPO_NAME = 'task-list-frontend';
export const SOURCE_REPO_OWNER = 'kevinchanaka';
export const SOURCE_REPO_BRANCH = 'main';
export const CODESTAR_CONNECTION_ARN = 'arn:aws:codestar-connections:' +
'ap-southeast-2:436501147244:connection/0e367578-3062-48ba-9a9a-b1ce675b7720';

export const EKS_CLUSTER_NAME = 'prod';
export const EKS_CLUSTER_ARN =
  'arn:aws:eks:ap-southeast-2:436501147244:cluster/prod';

export const VPC_LOOKUP_TAGS = {
  'aws:cloudformation:stack-name': 'eksctl-prod-cluster',
};
