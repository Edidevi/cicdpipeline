#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib';
import { CiCdPipelineStack } from '../lib/cicdpipeline-stack';

const app = new cdk.App();
new CiCdPipelineStack(app, 'CiCdPipelineStack', {
  env: {
    account: '701182342014', 
    region: 'us-east-1',
  }
});

app.synth();
