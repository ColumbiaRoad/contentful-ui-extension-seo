# Meta Description Assistant Contentful Field Extension

This extension renders a character count that warns the editor when the field goes over a set limit. There is also a link to a moz.com article about SEO best practices for editors to quickly understand what the extension aims to do.

## Installation

### Using Contentful web-app and GitHub

The simplest way to install a github is to provide a link to an extension.json file in a public github repo. Simply navigate to extension.json file in the folder structure of the extension you wish to install and then copy the url for that file. Then, in contentful, navigate to Settings -> Extensions. In the extensions settings page, click Add new extension -> Install from Github. If the pop-up does not accept the url from github then the url probably doesn't end with extension.json. If it does you can click Install button and wait a moment for the extension to finish installing. Once completed, set the installation parameters and start using the extensions by adding it to an asset model and setting the instance parameters.

### Using CLI and command line

To install this extension into a contentful environment follow these steps.

- make sure that you have the user privileges to install and change your target contentful space & environment
- clone the project files
- cd into extension root folder and run npm install
- npm run login && npm run configure && npm run deploy

Run login will open up contentful and have you log in. Once that is done it will give you an access token that you paste into the command line. Run configure will use that token to check what spaces you have access to and have you run through an interactive propmt to first choose the space and which environment in that space to install the extension on. The login and configure commands will create a .contenfulrc.json to store the access token, space id, and environment id. There is also a key for host which is most likely refering to the self-hosting option that the Contentful Enterprise tier enables. Once done run npm run deploy to install the extension with hosting provided by contentful.

## Setup

### Parameters

Extension parameters in contentful are used to set space wide or asset type wide variables to specific values. Think of these as environment variables, useful for things like api-urls, access tokens or other single-source parameters.

#### Installation

This extension has one installation wide parameter.

- Meta Description Max Length (Number | Optional (defaults to 160) | When set, overwrites the default value of 160 for when to warn editors that description length is over limit)
