module.exports = {
    name: 'create:project',
    description: 'Create new project Express API',
    run: async toolbox => {
       const {
          parameters, 
          template,
          print: {success, error }  
       } = toolbox

       const name = parameters.first

       if (!name) {
           error('Project name must be specified');
           return
       }

       await template.generate({
           template: 'api.js.ejs',
           target: `${name}/server.js`
       })

       await template.generate({
        template: 'routes.js.ejs',
        target: `${name}/src/routes.js`
      })

      await template.generate({
        template: 'package.json.ejs',
        target: `${name}/package.json`,
        props: { name }
    })

    await template.generate({
        template: 'connection.js.ejs',
        target: `${name}/src/database/conection.js`
    })

    await template.generate({
        template: 'delete.js',
        target: `${name}/src/database/migrations/delete.js`
    })

    await template.generate({
        template: 'ExampleController.js.ejs',
        target: `${name}/src/controller/ExampleController.js`
    })

    await template.generate({
        template: 'knex.js.ejs',
        target: './knexfile.js',
    })



       success(`Generated ${name} project`)

    },
};