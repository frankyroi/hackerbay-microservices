const sharp = require('sharp');
const download = require('image-downloader');
const { fileExtension } = require('../middleware/customMiddleware');
const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg'];

// Resize post image.
exports.create_thumbnail = (req, res, next) => {
  // Save image url and extension.
  const { imageUrl } = req.body
  // Save image extension and convert to lowercase.
  const imageUrlExt = fileExtension(imageUrl).toLowerCase()

  //Download image and save.
  if (imageTypes.includes(imageUrlExt)) {
    
    const options = {
      url: imageUrl,
      dest: './public/images/original/',
    }
    // Set location for resized images to be saved.
    const resizeFolder = './public/images/resized/'

    // Download image from the url and save in selected destination in options.
    download.image(options)
      .then(({ filename }) => {
        // Resize image to 50x50 and save to desired location.
        // user feedback.
        sharp(filename)
          .resize(50, 50)
          .toFile(`${resizeFolder}output.${imageUrlExt}`, (err) => {
            if (err) { return next(err) }
            return res.json({
              converted: true, user: req.user.username, success: 'Image has been resized', thumbnail: resizeFolder,
            })
          })
      })
      .catch(() => {
        res.status(400).json({ error: 'Incorrect image url and try again' })
      })
  } else {
    res.status(400).json({ error: `Make sure image has one of the following extensions - ${[...imageTypes]}` })
  }
}