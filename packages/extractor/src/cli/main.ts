#!/usr/bin/env node

require('@oclif/command')
  .run()
  .then(require('@oclif/command/flush'))
  .catch((error: Error) => {
    const oclifHandler = require('@oclif/errors/handle')
    oclifHandler(error)
  })
