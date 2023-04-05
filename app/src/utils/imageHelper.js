import Jimp from "jimp/es"
import { Tensor } from "onnxruntime-web"

export async function getImageTensorFromPath(path, dims = [1, 3, 224, 224]) {
  // 1. load the image
  const image = await loadImageFromPath(path, dims[2], dims[3])
  // 2. convert to tensor
  const imageTensor = imageDataToTensor(image, dims)
  // 3. return the tensor
  return imageTensor
}

async function loadImageFromPath(path, width = 224, height = 224) {
  // Use Jimp to load the image and resize it.
  const imageData = await Jimp.read(path).then((imageBuffer) => {
    return imageBuffer.resize(232, 232).crop(3, 3, 224, 224)
  })

  return imageData
}

function imageDataToTensor(image, dims) {
  // 1. Get buffer data from image and create R, G, and B arrays.
  const imageBufferData = image.bitmap.data
  const [redArray, greenArray, blueArray] = new Array(
    new Array(),
    new Array(),
    new Array()
  )

  // 2. Loop through the image buffer and extract the R, G, and B channels
  for (let i = 0; i < imageBufferData.length; i += 4) {
    redArray.push((imageBufferData[i] / 255.0 - 0.485) / 0.229)
    greenArray.push((imageBufferData[i + 1] / 255.0 - 0.456) / 0.224)
    blueArray.push((imageBufferData[i + 2] / 255.0 - 0.406) / 0.225)
    // skip data[i + 3] to filter out the alpha channel
  }

  // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
  const transposedData = redArray.concat(greenArray).concat(blueArray)

  // 4. convert to float32
  let i,
    l = transposedData.length // length, we need this for the loop
  // create the Float32Array size 3 * 224 * 224 for these dimensions output
  const float32Data = new Float32Array(dims[1] * dims[2] * dims[3])
  for (i = 0; i < l; i++) {
    float32Data[i] = transposedData[i]
  }
  // 5. create the tensor object from onnxruntime-web.
  const inputTensor = new Tensor("float32", float32Data, dims)
  return inputTensor
}
