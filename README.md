grunt-modules
=============

Create a module from a list of files.  Modules are using by the Grunt-Reputation-Require app, and are based on backbone.js style routers, collections/models, views, and template files, along with any module specific libs that may be needed.  The task takes those files passed in, wraps them in an AMD wrapper (with nothing defined) and then drops in the libs, then the routers, then models, then collections, then views, and finally JST style templates.  The end result is a single file that can be require'd in and can be a full stand-alone page.

Handles Libs, Routers, Views, Templates, Collections and Models.

here is a sample:

    modules: {
      "/tmp/module/test.js": {
        files: {
          templates: [
            "test/testFiles/templates.js"
          ],
          views: [
            "test/testFiles/view.js"
          ],
          collections: [
            "test/testFiles/collection.js"
          ],
          models: [
            "test/testFiles/model.js"
          ],
          router: "test/testFiles/router.js",
          libs: "test/testFiles/libs.js"
        }
      }
    }

If you choose not to use a router (maybe because you are creating a wrapper module) you can omit the router portion of the files object and add name.  You must have either a router or a name.

    modules: {
      "/tmp/module/test2.js": {
        name: "Test",
        files: {
          templates: [
            "test/testFiles/templates.js"
          ],
          views: [
            "test/testFiles/view.js"
          ],
          collections: [
            "test/testFiles/collection.js"
          ],
          models: [
            "test/testFiles/model.js"
          ],
          libs: [
            "test/testFiles/libs.js"
          ]
        }
      }
    }