# Pipeline
Setup and Design Notes for CI/CD

## Build
Build and hashing is handled by create-react-app

## Test/Deploy
Testing handled by create-react-app and run through travis. Travis then deploys passing code to an s3 bucket, where it is hosted as a static website

### S3 setup
 - Create a bucket
 - Make sure bucket is in default region 'US East (N. Virginia)'
 - Allow public access
 - Generate an Access Key for the corresponding IAM
 - Add to settings on the project's in Travis
 - Update Bucket Policy with "PublicReadGetObject"
 - Turn on static site hosting
 - Create Alias in Route53 to redirect to the bucket
