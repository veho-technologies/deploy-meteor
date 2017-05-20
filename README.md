# deploy-meteor

This is a simple command line Node app that helps you deploy/update a Meteor application.

## Prerequisites

You need to install [pm2](https://www.npmjs.com/package/pm2) globally and have the server tarball,
that `meteor build` creates, extracted already.

Also, we assume that you have your Meteor settings stored inside your Meteor app's assets.
 (You might want to check out [git-crypt](https://github.com/AGWA/git-crypt) if you have sensitive
 information in your settings file.)

## Usage

Assuming you have the following setup:

- extracted server tarball in `/home/my-fancy-app/bundle`
- an existing/prefilled pm2 config file in `/home/my-fancy-app/pm2-config.json` with a content looking like this:

    ```json
    {
        "name": "my-fancy-app",
        "env": {
            "PORT": 3000,
            "HTTP_FORWARDED_COUNT": 1,
            "MONGO_URL": "mongodb://localhost:27017/my_fancy_app?replicaSet=rs0",
            "MONGO_OPLOG_URL": "mongodb://localhost:27017/local?replicaSet=rs0&authSource=my_fancy_app",
            "ROOT_URL": "https://my-fancy-app.com",
            "MAIL_URL": "smtp://bot%40my-fancy-app.com:s3cr3t@smtp.mailgun.org:587"
        }
    }
    ```
    
- your settings file is located inside your Meteor project at `private/settings.json`

    ```json
    {
	  "AWSAccessKeyId": "test",
	  "AWSSecretAccessKey": "test",
	  "AWSBucket": "test",
	  "AWSRegion": "test"
	}
	```

- `deploy-meteor` is installed in `~/deploy-meteor`

If you then run 

```shell
cd ~/deploy-meteor
node . --config=/home/my-fancy-app/pm2-config.json --settings=settings.json /home/my-fancy-app/bundle
```

your config file `/home/my-fancy-app/pm2-config.json` will be updated like this:

```json
{
    "name": "my-fancy-app",
    "cwd": "/home/my-fancy-app/bundle",
    "script": "main.js",
    "env": {
        "PORT": 3000,
        "HTTP_FORWARDED_COUNT": 1,
        "MONGO_URL": "mongodb://localhost:27017/my_fancy_app?replicaSet=rs0",
        "MONGO_OPLOG_URL": "mongodb://localhost:27017/local?replicaSet=rs0&authSource=my_fancy_app",
        "ROOT_URL": "https://my-fancy-app.com",
        "MAIL_URL": "smtp://bot%40my-fancy-app.com:s3cr3t@smtp.mailgun.org:587",
        "METEOR_SETTINGS": "{\"AWSAccessKeyId\":\"test\",\"AWSSecretAccessKey\":\"test\",\"AWSBucket\":\"test\",\"AWSRegion\":\"test\"}"
    }
}
```

## Options

- `--

## License

MIT