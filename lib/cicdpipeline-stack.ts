import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  
    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'OsaruPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Edidevi/cicdpipeline', 'main'),
        commands: [ 'npm ci',
                    'npm run build',
                    'npx cdk synth']
      }),
    });


    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "701182342014", region: "us-east-1" }
    }));


    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));


    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
      env: { account: "701182342014", region: "us-east-1" }
    }));

  }
}






