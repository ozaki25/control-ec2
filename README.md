## Get Started

### Setup

```bash
# if Node is not installed
brew install node
# if yarn is not installed
npm i -g yarn
```

- clone this repository

```bash
git clone https://github.com/ozaki25/control-ec2.git
cd control-ec2
yarn
```

### AWS Setting

- confirm key information of AWS is set

```bash
cat ~/.aws/credentials
[default]
aws_access_key_id = XXXXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
region = ap-northeast-1
output = json
```

### Deploy to Lambda

```bash
yarn deploy
```

### Check Lambda info

```bash
yarn run info
```
