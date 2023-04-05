import { getImageTensorFromPath } from "./imageHelper"
import { runInference } from "./modelHelper"

export async function inferenceModel(path, session) {
  // 1. Convert image to tensor
  const imageTensor = await getImageTensorFromPath(path)
  // 2. Run model
  const [predictions, inferenceTime] = await runInference(imageTensor, session)
  // 3. Return predictions and the amount of time it took to inference.
  return [predictions, inferenceTime]
}
