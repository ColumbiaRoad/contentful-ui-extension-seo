# Title Assistant Contentful Field Extension

This extension enables a content editor inside contentful to immediately see how a given page title, url-slug, and meta description will render in a google search result. The field itself is made to render a character count that warns the editor when the full title goes over a set limit as well as appending a globaly set brand-name to the chosen title fields. There is also a switch for manually removing the appending of the brand name and links to moz.com articles about SEO best practices for editors to quickly understand what the extension aims to do.

## Installation

### Using Contentful web-app and GitHub

The simplest way to install a github is to provide a link to an extension.json file in a public github repo. Simply navigate to extension.json file in the folder structure of the extension you wish to install and then copy the url for that file. Then, in contentful, navigate to Settings -> Extensions. In the extensions settings page, click Add new extension -> Install from Github. If the pop-up does not accept the url from github then the url probably doesn't end with extension.json. If it does you can click Install button and wait a moment for the extension to finish installing. Once completed, set the installation parameters and start using the extensions by adding it to an asset model and setting the instance parameters.

### Using CLI and command line

To install this extension into a contentful environment follow these steps.

* make sure that you have the user privileges to install and change your target contentful space & environment
* clone the project files
* cd into extension root folder and run npm install
* npm run login && npm run configure && npm run deploy

Run login will open up contentful and have you log in. Once that is done it will give you an access token that you paste into the command line. Run configure will use that token to check what spaces you have access to and have you run through an interactive propmt to first choose the space and which environment in that space to install the extension on. The login and configure commands will create a .contenfulrc.json to store the access token, space id, and environment id. There is also a key for host which is most likely refering to the self-hosting option that the Contentful Enterprise tier enables. Once done run npm run deploy to install the extension with hosting provided by contentful.

## Setup

### Parameters

Extension parameters in contentful are used to set space wide or asset type wide variables to specific values. Think of these as environment variables, useful for things like api-urls, access tokens or other single-source parameters.

#### Installation

This extension has three installation wide parameters.

* Brand Name (Symbol | Recommended | When set, the extension appends this to the end of the attached title field according to the moz guidelines of title tags)
* Url Stub (Symbol | Recommended | When set, prepends this to the url string set on the later instance field. Purely cosmetic but good to set in order for the google search preview to look complete)
* Title Max Length (Number | Optional (defaults to 60) | When set, overwrites the default value of 60 for when to warn editors that their title length is over limit)

#### Instance

This extension has two instance wide parameters. Both are purely cosmetic and are only used for rendering the search result previewer correctly.

* URL Slug Target Field (Symbol | Recommended | Set this to the id of the field in which you are writing the page url)
* Meta Description Target Field (Symbol | Recommended | Set this to the id of the field in which you write the meta description)
