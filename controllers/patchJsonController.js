const { body, validationResult } = require('express-validator')
const jsonpatch = require('fast-json-patch')

exports.patch_json = [
    // Validate input fields. Trim spaces around username
    body('jsonObject', 'JSON object must not be empty.').isLength({ min: 1 }),
    body('jsonPatchObject', 'JSON patch object must not be empty.').isLength({ min: 1 }),
  
    // Process the request after validating.
    (req, res, next) => {
      // Save errors from validating, if any.
      const errors = validationResult(req)
  
      // Check if there were errors from the form.
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
  
      // Save object-to-patch and patch-object from the request.
      const jsonObject = JSON.parse(req.body.jsonObject)
      const jsonPatchObject = JSON.parse(req.body.jsonPatchObject)
  
      // Save patch in new variable.
      const patchedObject = jsonpatch.applyPatch(jsonObject, jsonPatchObject).newDocument
      // res.json({user: req.user.username, patchedObject: patchedObject})
      res.json({ patchedObject })
    },
  ]