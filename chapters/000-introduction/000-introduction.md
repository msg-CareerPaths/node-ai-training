# Node AI Training Introduction

>
> Note this training assumes you have some previous experience with `Angular`, `Nest.js` and `AWS`.
> 
> If you do not, please consult those training paths beforehand.
> 

## Description 
First, I would like to start by emphasizing with reader that the following read is quite verbose, but I would like to ask that you read the following carefully.

This is a roadmap/training for an introduction into the Integrating LLM into an Application consisting of several steps.
In each step, a set of theoretical concepts is explored, supported by reference documentation, book chapters, tutorials and videos. 

In parallel, a simple application will be built with the learned concepts: the *Online Shop* application.
After the learning material for a given step was sufficiently explored, either some new functionality will be added to this application or old functionality will be refactored.

## Working Mode

All the code written must be published on GitHub.

- Create your own repository on your personal account and give access to your mentor (make sure you specify your name in case you have an esoteric username).
- Commits must be pushed when each individual chapter is finished. 
- [Create](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository) a `develop` branch from the `master` branch **before starting work**.
- **In order to request a code review from the mentors**, you must [open a pull request](https://help.github.com/en/articles/creating-a-pull-request) from the `develop` to the `master` branch. Inform them in your **daily standup** of this or through a PM.
- **Once the Pull Request is approved** by the mentors, merge it into `main` and create another branch from master to continue work.
- Take care to delete your `develop` branch then, go back inside your IDE to `main` and update it (git pull)
- Carry on your work by creating another `develop` branch and working on it
- Repeat ad infinitum (until the training has ended)

## Environment Setup

On your local machine install the following:
- You need to install [NodeJS](https://nodejs.org/en/) (use the recommended LTS version)
- We will be using AI models from AWS Bedrock for this training, so you will need to have the following:
  - An active AWS account, we will be using the `eu-central-1` region.
  - [Aws CLI](https://aws.amazon.com/cli/) 
  - Configure your account for local development via Secret Access Keys
  - Take care you have requested access to some LLM models in your [AWS Bedrock](https://www.youtube.com/watch?v=WWHo7Awy0sQ)
  - If you want to use another LLM Cloud Provider (like OpenAI directly, please refer to the prerequisites on their website)
- We will be using Containerization for several dependencies which will be run locally:
  - Install either [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Podman](https://podman.io/)
  - If you are on Windows, take care you have configured your [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- You will need an IDE (Integrated Development Environment) so you can code:
  - [Webstorm](https://www.jetbrains.com/webstorm/) (Non-Commercial Version)
  - [VSCode](https://code.visualstudio.com/download)
  - The training suggestion will be to use an AI-powered IDE or Integration with your favorite IDE (note this will likely require an active AI subscription):
    - [Cursor](https://cursor.com/download)
    - [CodexCli](https://developers.openai.com/codex/cli/)
    - [ClaudeCode](https://claudecode.io/)
    - [Cline](https://cline.bot/)
- You need to have [Git](https://git-scm.com) installed on your computer.
- Have also [Notepad++](https://notepad-plus-plus.org/downloads/) for a nicer basic file editing experience

## Online Shop

The base application, created using Nest.js and Angular, is provided under the [app](../../app) folder. 

Read the instructions [App README](../../app/README.md) for onboarding and setup.

Users are seeded via a migration directly, currently there are only 2 users for local development:
- Username: admin, Password: admin, Role: Admin
- Username: jdoe, Password: jdoe, Role: User

## Notes
- If you find any link broken, **please** inform your mentor to give you an alternative.
- Keep in mind that the videos might present content relating to **older version** library version.
- Try to speed up the videos to *1.5x/2x* if you find them too slow.
- Try to connect to the Backend from the Spring Training if you have training completed (you might need to change the port for your requests)

## ZScaler Issues (OPTIONAL - only when needed)

You might encounter ZScaler issues due to company bureaucracy. ZScaler is proxy that scan and routes the internet traffic of your device, blocking you from accesing certain internet endpoints.
Thus, if you encounter `SSL CERTIFICATE ERRORS`, `UNABLE TO GET LOCAL ISSUER CERTIFICATE` or simply connection issue this **may** point you to a ZScaler problem.

First steps:
- Download the certificate offered by the company
- Save the certificate in C:\zscaler.crt

### Webstorm Issues
- Go to File\Settings in your IDE
- Search for `Proxy` in the search bar
- Turn on the `Auto-detect proxy settings`
- Search for `Server Certificates`
- Press the `plus` icon in the Accepted Certificates tables and add the Zscaler certificate

### Git Issues
- Go to `C:\Users\<your_username>\AppData\Local\Programs\Git\mingw64\ssl\certs` and open `ca-bundle.crt` in Notepad
- Open in a parallel notepad instance the `zscaler.crt`
- **Copy** the content from `zscaler.crt` to the bottom of the `ca-bundle.crt` file (leave an empty space between)
- You can make `Git` trust the Windows certificate store by running in a terminal instance `git config --global http.sslBackend schannel`

### Node.js Issues
- Open windows search bar and type `environment`
- Select `Edit environment variables...` and select `Environment Variables` from the new window
- In User variables add a new one with the name `NODE_EXTRA_CA_CERTS` and the value being the `path to your saved certificate` (C:\zscaler.crt)
- Restart your computer
