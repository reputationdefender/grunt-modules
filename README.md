grunt-modules
=============

Create a module from a list of files.  Handles Routers, Views, Collections and Models.

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
          router: "test/testFiles/router.js"
        }
      }
    }

If you choose not to use a router (maybe because you are creating a wrapper module) you can omit the router portion of the files object and add name

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
          ]
        }
      }
    }