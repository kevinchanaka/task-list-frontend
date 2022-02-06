#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {PipelineStack} from '../lib/pipeline-stack';
import {ENV} from '../lib/config';

const app = new cdk.App();
const env = ENV;

new PipelineStack(app, 'FrontendPipelineStack', {env: env});
