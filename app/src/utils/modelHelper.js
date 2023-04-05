import * as ort from "onnxruntime-web"
import _ from "lodash"
import imagenetClasses from "../data/classes"

export async function createSession() {
  // Create session and set options. See the docs here for more options:
  //https://onnxruntime.ai/docs/api/js/interfaces/InferenceSession.SessionOptions.html#graphOptimizationLevel
  const session = await ort.InferenceSession.create(
    "/assets/trained_model.onnx",
    { executionProviders: ["webgl"], graphOptimizationLevel: "all" }
  )
  console.log("Inference session created")
  return session
}

export async function runInference(preprocessedData, session) {
  // Get start time to calculate inference time.
  const start = new Date()
  // create feeds with the input name from model export and the preprocessed data.
  const feeds = {}
  feeds[session.inputNames[0]] = preprocessedData

  // Run the session inference.
  const outputData = await session.run(feeds)
  // Get the end time to calculate inference time.
  const end = new Date()
  // Convert to seconds.
  const inferenceTime = (end.getTime() - start.getTime()) / 1000
  // Get output results with the output name from the model export.
  const output = outputData[session.outputNames[0]]
  //Get the softmax of the output data. The softmax transforms values to be between 0 and 1
  var outputSoftmax = softmax(Array.prototype.slice.call(output.data))

  //Get the top 5 results.
  var results = imagenetClassesTopK(outputSoftmax, 5)
  console.log("results: ", results)
  return [results, inferenceTime]
}

//The softmax transforms values to be between 0 and 1
function softmax(resultArray) {
  // Get the largest value in the array.
  const largestNumber = Math.max(...resultArray)
  // Apply exponential function to each result item subtracted by the largest number, use reduce to get the previous result number and the current number to sum all the exponentials results.
  const sumOfExp = resultArray
    .map((resultItem) => Math.exp(resultItem - largestNumber))
    .reduce((prevNumber, currentNumber) => prevNumber + currentNumber)
  //Normalizes the resultArray by dividing by the sum of all exponentials; this normalization ensures that the sum of the components of the output vector is 1.
  return resultArray.map((resultValue, index) => {
    return Math.exp(resultValue - largestNumber) / sumOfExp
  })
}
/**
 * Find top k imagenet classes
 */
export function imagenetClassesTopK(classProbabilities, k = 5) {
  const probs = _.isTypedArray(classProbabilities)
    ? Array.prototype.slice.call(classProbabilities)
    : classProbabilities

  const sorted = _.reverse(
    _.sortBy(
      probs.map((prob, index) => [prob, index]),
      (probIndex) => probIndex[0]
    )
  )

  const topK = _.take(sorted, k).map((probIndex) => {
    const iClass = imagenetClasses[probIndex[1]]
    return {
      index: parseInt(probIndex[1].toString(), 10),
      name: iClass,
      probability: probIndex[0],
    }
  })
  return topK
}
