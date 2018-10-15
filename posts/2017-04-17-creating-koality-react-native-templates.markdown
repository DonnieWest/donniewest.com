---
layout: post
title: "Eliminate Boilerplate with React Native Templates"
date: 2017-04-17 10:49:41 -0500
comments: true
categories: 
---

At [Code Koalas](https://codekoalas.com), we love React Native. We also _hate_ boilerplate and unfortunately it seems like all of our new React Native projects use the same libraries and the same initial boilerplate. We decided to eliminate that boilerplate with React Native CLI's new unspoken feature: project templates. With this feature, you too can eliminate boilerplate and speed along the production of your new shiny React Native apps.

## How to use React Native project templates

If you've not heard of them before, [React 0.42](https://github.com/facebook/react-native/releases/tag/v0.42.3) quietly released a feature that allows a user to specify a template for a newly initialized React Native app and even bundled a template that demonstrated how to build an app with navigation. Even cooler, you can also specify npm packages to create the new app from like so:

```
react-native init newApp --template koality
```

And I'm going to show you how to build your own.

## Initialize

Unfortunately, the tooling for creating a template compatible with React Native's cli is nonexistent. The solution we're going to use here is to leverage the existing architecture around creating a React Native app and change the end product into a template. Let's start by initializing our React Native project.

```
react-native init <your sample app template name here>
```

## Code

Here's where I leave it up to your imagination. In the case of our team, we created a [super basic app template](https://github.com/CodeKoalas/koality-react-native-template) that integrated:

- React Router
- Redux
- Redux persist
- Styled Components

and other basic bits of boilerplate necessary to start most of our internal projects. I recommend keeping this template fairly minimal so that you don't spend time replacing libraries or ripping out parts you don't need and therefore wasting more time than you end up saving.

## Clean

After you're done coding and the app looks about like you would want, it's time to actually turn it into a React Native template. Start by modifying your package.json which probably looks like this by now.

```
{
  "name": "sample",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest"
  },
  "dependencies": {
    "react": "16.0.0-alpha.6",
    "react-native": "0.43.3",
    "react-router-native": "^4.0.0",
    "react-router-redux": "^4.0.8",
    "redux": "^3.6.0"
  },
  "devDependencies": {
    "babel-jest": "19.0.0",
    "babel-preset-react-native": "1.9.1",
    "jest": "19.0.2",
    "react-test-renderer": "16.0.0-alpha.6"
  },
  "jest": {
    "preset": "react-native"
  }
}
```

Start by creating a dependencies.json file and move your dependencies object from the package.json file to the dependencies.json file

```
{
  "react-router-native": "^4.0.0",
  "react-router-redux": "^4.0.8",
  "redux": "^3.6.0"
}
```

Note: Sadly, react native templates don't support installing dev dependencies. See the conclusion for a workaround

From here, it's time to strip out the entries in the package.json file that are no longer needed. Remove the dependencies, scripts, dev dependencies and anything else you don't need from the package.json. Finally, rename your template in the format `react-native-template-<your name here>`. For example, when a user specifies the "sample" template via `--template sample`, React Native will look for the npm package "react-native-template-sample" instead of the npm package called "sample"

```
{
  "name": "react-native-template-sample",
  "version": "0.0.1"
}
```



Note: Don't leave behind the dependencies block or anything unneeded in the package.json. React Native's CLI will ignore the package.json for the generated app and the additional installed depdendencies in your package.json can cause problems. In my case, React Native would install during the template creation and create extra native directories that would fail to compile.

You also need to delete any directories containing native code that might interfere with your generated app.

```
rm -rf ./android
rm -rf ./ios
```

Project templates also have a nifty feature so that if you put the string `HelloWorld` in your template anywhere, it'll get substituted with the project name supplied by the consumer of the template. The biggest place to watch out for this is in the index.ios.js and index.android.js where you register your app by name. Change the registration code to the following in both files:

```
...your code here

AppRegistry.registerComponent('HelloWorld', () => App);
```

Be sure to also substitute anywhere else in your template that you use the app name with 'HelloWorld'

## Publish

You can now test your template by running the following commands

```
# Initialize a new project pointing to the template you just made on your filesystem
react-native init test --template file://path/to/your/template
cd test
react-native run-android # or run-ios if that's your jam
```

If your app runs successfully, congratulations! It works!

Now you have a template worthy of publishing. You can put it up on the npm registry for all to use and/or push it up to Github for others to see the source. It's totally up to you!

## Conclusion

React Native projects typically start off with a lot of chores needed to get up and running. Now with the knowledge of React Native's project template feature you can remove that boilerplate and get to coding faster.


## Notes

### Caveats with project templates
- Dev Dependencies: basically have to write a script to initialize your dev dependencies yourself
  - We tackled that by stealing a postInstall script from [react-native-template-starter](https://github.com/doomsower/react-native-template-starter/blob/f6cd738d8352e53758ce8504f74464f8a407149e/scripts/postInit.js)
  - See [our version of the script](https://github.com/CodeKoalas/koality-react-native-template/blob/master/scripts/setupDevDependencies.js) that can choose between yarn and npm and installs only dev dependencies for you 
- Incompatibility with other CLI tools, namely haul and create-react-native-app
- Poor documentation, not sure if this will change or get better with time

### Alternatives

- [Ignite 2.0](https://infinite.red/ignite)
  - Ignite is a powerful CLI that gives you a lot of control out of the box for generating cool React Native apps
  - If you tend to stick with the same stack or end up not needing a lot of Ignite's stuff, probably worth creating your own template
  - If your favorite library isn't supported, have to still add it every time
  - Note: You can simply take the generated Ignite app and strip it down into your own RN template
- [Code Canyon](https://codecanyon.net/search?utf8=%E2%9C%93&term=react+native), [Strap Mobile](https://strapmobile.com/) or other online template stores
  - Not OSS
  - Unless your app matches their example closely, you're probably going to make major modifications
  - Can't see what you're getting until you've already purchased it
- Hand rolled ala [Yeoman](http://yeoman.io/) or Custom script
  - You end up writing a lot more code to arrive at the same result
  - A lot more error prone
  - Infinitely more flexible than any of the options presented
