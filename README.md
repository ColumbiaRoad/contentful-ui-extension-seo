# Contentful UI Extensions for SEO Purposes <!-- omit in toc -->

UI Extensions we use at Columbia Road for improving the editor workflow in Contentful.

These are inspired by Yaost SEO plugin for Wordpress.

These UI extensions are designed to work with a good generic content model for pages that include a hierarchical navigation not directly attached to the page itself. This follows [Contentful's navigation modeling guide option 3](https://www.contentful.com/r/knowledgebase/modelling-navigation/#navigation-content-type-using-pages-or-topics).

## Table of Contents <!-- omit in toc -->

- [Contentful Structure](#contentful-structure)
- [UI Extensions](#ui-extensions)
  - [Title Assistant (Field extension)](#title-assistant-field-extension)
  - [URL Assistant (Field extension)](#url-assistant-field-extension)
  - [Meta Description Assistant (Field extension)](#meta-description-assistant-field-extension)
- [Installation to Contentful](#installation-to-contentful)
- [Development](#development)

## Contentful Structure

Here's the expected setup for content types and fields (but you can use most extensions even if your structure is different):

* Page - Content Type

| Field Name | Field type                                         |
| ---------- | -------------------------------------------------- |
| Name       | Short text, for internal use                       |
| Content    | Ref to Assembly models which are the UI components |


* Navigation - Content Type

| Field Name        | Field type              | 
| ----------------- | ----------------------- | 
| URL Slug          | Short text              | 
| Canonical         | Short text              | 
| Title             | Short text              | 
| Page | ref to Page where navigation points  |
| Meta Description  | Long text               | 
| Robot tags        | Short text, list        | 
| Child-page        | Ref to Navigation entry | 
| Social Media tags | ...                     | 


## UI Extensions

* Display URL slug in Page entry (Sidebar extension)
* Title Assistant (Field extension)
* URL Assistant (Field extension)
* Meta Description Assistant (Field extension)


Inspiration from: https://yoast.com/wordpress/plugins/seo/titles-and-meta-descriptions/

### Title Assistant (Field extension)

Suggests a length of max 60 character, and visualizes it with red color if it goes over. Includes a character counter. Includes link to https://moz.com/learn/seo/title-tag for editor to read more.

### URL Assistant (Field extension)

Automatically creates a URL slug from the title, using dashes to replace spaces. Allows user to modify it.

### Meta Description Assistant (Field extension)

Suggests a length of max 155 character descriptions, and gives red color when it goes over. Includes a character counter. Includes link to https://moz.com/learn/seo/meta-description for editor to read more.


## Installation to Contentful

### Using Contentful web-app and GitHub

The simplest way to install a github is to provide a link to an extension.json file in a public github repo. Simply navigate to extension.json file in the folder structure of the extension you wish to install and then copy the url for that file. Then, in contentful, navigate to Settings -> Extensions. In the extensions settings page, click Add new extension -> Install from Github. If the pop-up does not accept the url from github then the url probably doesn't end with extension.json. If it does you can click Install button and wait a moment for the extension to finish installing. Once completed, set the installation parameters and start using the extensions by adding it to an asset model and setting the instance parameters.

### Using CLI and command line

To install this extension into a contentful environment follow these steps.

* make sure that you have the user privileges to install and change your target contentful space & environment
* clone the project files
* cd into extension root folder and run npm install
* npm run login && npm run configure && npm run deploy

Run login will open up contentful and have you log in. Once that is done it will give you an access token that you paste into the command line. Run configure will use that token to check what spaces you have access to and have you run through an interactive propmt to first choose the space and which environment in that space to install the extension on. The login and configure commands will create a .contenfulrc.json to store the access token, space id, and environment id. There is also a key for host which is most likely refering to the self-hosting option that the Contentful Enterprise tier enables. Once done run npm run deploy to install the extension with hosting provided by contentful.

## Development

* Clone repo to local machine
* cd <extension-name> && npm install
* npm run login && npm run configure
* npm run start

In the configuration stage, the extension gets installed into whatever environment you choose in the interactive prompts. The CLI-tool will configure contentful to fetch the extension source code from localhost:1234 and automatically updates server restart. If the dev server has not been started it will fail to show you the field because the iframe that the extension is rendered inside of fails to compile.

As of writing it is unclear wether it rewrites the extension for all users and thus breaks it for everyone else using the environment that is being modified or if it just replaces the host target for the user. Regardless, always run development in environments that are separated from production content.
