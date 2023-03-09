import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';

export class IamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const Rolename = new cdk.CfnParameter(this, 'Rolename', {
      type: 'String',
      default: process.env.ROLE_NAME,
      description: 'The name of the Role',
    });

    const lambdapolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          resources: ['*'],
          actions: [
            'logs:CreateLogGroup',
            'logs:CreateLogStream',
            'logs:PutLogEvents',
            ],   
            effect: iam.Effect.ALLOW,
          })
        ]
    });

    const roleforlambda = new iam.Role(this, 'example-iam-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      roleName: Rolename.valueAsString, 
      description: 'An example IAM role in AWS CDK',
      inlinePolicies: {
        FilterLogEvents: lambdapolicy,
      },
    });
 
  }
}
