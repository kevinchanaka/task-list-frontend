import * as cdk from 'aws-cdk-lib';
import {aws_codebuild as codebuild} from 'aws-cdk-lib';
import {aws_codepipeline as codepipeline} from 'aws-cdk-lib';
import {aws_iam as iam} from 'aws-cdk-lib';
import {aws_codepipeline_actions as codepipelineActions} from 'aws-cdk-lib';
import {aws_ec2 as ec2} from 'aws-cdk-lib';
import {aws_ecr as ecr} from 'aws-cdk-lib';
import {CODESTAR_CONNECTION_ARN, EKS_CLUSTER_ARN, EKS_CLUSTER_NAME, SOURCE_REPO_OWNER,
  SOURCE_REPO_NAME, SOURCE_REPO_BRANCH, VPC_LOOKUP_TAGS} from '../lib/config';

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {tags: VPC_LOOKUP_TAGS});

    const ecrRepository = new ecr.Repository(this, 'ECRRepository', {
      repositoryName: 'task-list-frontend',
    });

    const ecrAccessPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: ['*'],
      actions: [
        'ecr:GetAuthorizationToken',
        'ecr:GetDownloadUrlForLayer',
        'ecr:BatchCheckLayerAvailability',
        'ecr:BatchGetImage',
        'ecr:BatchDeleteImage',
        'ecr:PutImage',
        'ecr:InitiateLayerUpload',
        'ecr:UploadLayerPart',
        'ecr:CompleteLayerUpload',
      ],
    });

    const eksDeployPolicy = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [EKS_CLUSTER_ARN],
        actions: [
          'eks:DescribeCluster',
        ],
      });
  
    const buildAndDeployProject = new codebuild.PipelineProject(
        this, 'TaskListFrontendBuildDeploy', {
          buildSpec: codebuild.BuildSpec.fromSourceFilename(
              'deploy/config/buildspec.yaml'),
          vpc: vpc,
          environment: {
            privileged: true,
            buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
            computeType: codebuild.ComputeType.SMALL,
          },
          environmentVariables: {
            ECR_REPOSITORY_URI: {
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
              value: ecrRepository.repositoryUri,
            },
            ECR_REGISTRY: {
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
              value: ecrRepository.repositoryUri.split('/')[0],
            },
            ECR_REPOSITORY: {
              type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
              value: ecrRepository.repositoryUri.split('/')[1],
            },
            EKS_CLUSTER_NAME: {
                type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
                value: EKS_CLUSTER_NAME,
            },
          },
        });

    buildAndDeployProject.addToRolePolicy(ecrAccessPolicy)
    buildAndDeployProject.addToRolePolicy(eksDeployPolicy)

    const sourceAction = new codepipelineActions.
        CodeStarConnectionsSourceAction({
          actionName: 'Source',
          connectionArn: CODESTAR_CONNECTION_ARN,
          output: new codepipeline.Artifact('SourceArtifact'),
          owner: SOURCE_REPO_OWNER,
          repo: SOURCE_REPO_NAME,
          branch: SOURCE_REPO_BRANCH,
        });

    const deployAction = new codepipelineActions.CodeBuildAction({
      actionName: 'Deploy',
      input: new codepipeline.Artifact('SourceArtifact'),
      project: buildAndDeployProject,
    });

    new codepipeline.Pipeline(this, 'TaskListFrontendPipeline', {
      crossAccountKeys: false,
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Deploy',
          actions: [deployAction],
        },
      ],
    });
  }
}
