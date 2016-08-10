# Bubbleup

> Configuration free tooling

Bubbleup is designed to be a configuration-free way to create your build and test 
systems. Configuring your project is always a very time consuming and energy draining process.
The goal of bubbleup is to allow 'configuration' by simply `npm install`ing what you want to use. 

## CLI 
---

### **bubbleup build**

Goes through all of your installed base build plugins and will execute them as your build process.

### **bubbleup test**

Goes through all of your installed test plugins and will execute them as your build process.

### CLI options

#### --pluginsPath *path* or -p *path*

By default bubbleup will look inside the current directory for `node_modules` 
to find and require your bubble plugins. Using `-p` will change the page it will
search in.

## Node API 
----

### **findAllPlugins(directory)**

Searchs through the given `directory` for **all** folders prefixed with 
`bubbleup-plugin` and returns an array of all the matched names.

### **findBuildPlugins(directory)**

Searchs through the given `directory` for **all** folders prefixed with 
`bubbleup-plugin-build` and returns an array of all the matched names.

### **findTestPlugin(directory)**

Searchs through the given `directory` for **all** folders prefixed with 
`bubbleup-plugin-test` and returns an array of all the matched names.

### **findPluginsByPrefix(directory, prefix)**

Searchs through the given `directory` for **all** folders prefixed with 
the given `prefix` and returns an array of all the matched names.

This can be very useful for configuring plugins to further configure another plugin.

### **isBasePlugin(plugin)**

Given a plugin returns `true` if it is a base plugin, and `false` if it is **not**.

### **requirePlugins(directory, pluginNames)**

Given a `directory` to search for plugins and an array of `pluginNames` returns 
an array of plugin instances.

## Plugins

A plugin is a simple object. The interface is as follows:

```js
interface Plugin {
  exec (args, options, currentWorkingDirectory): void
  base: boolean
}
```

**args** {string | Array<String> }

`args` is the parameters passed to the given command

When using `bubbleup build <entryFile>` the entryFile name is used as **args**.
When using `bubble test <filesGlob>` an array of matched files are used a **args**

**options** {Object}

The underlying cli uses [commander.js](https://github.com/tj/commander.js/) and 
simply passes on the Options object that an `.action()` recieves as the second argument.

## Base Plugins 

A **base** plugin is a plugin in which has `base` equal to `true`. 
`bubbleup build` and `bubbleup test` **only** execute base plugins. Base plugins
are assumed to be the entry point to a further plugin system. 

For instance `bubbleup-plugin-test-mocha` could be a base plugin, which can be 
further configured simply by installing `bubbleup-plugin-test-mocha-babel-register` 
to use babel-register to run your tests. (Neither of these plugins exist yet)
