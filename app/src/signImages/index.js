const Map = {}
for (const i of [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]) {
  console.log(i)
  Map[i] = require(`./Sign_language_${i}.svg`).default
}

const SignImage = ({ letter }) =>
  letter && (
    <img
      style={{ maxWidth: "100%" }}
      src={Map[letter]}
      alt={`ASL demonstration for ${letter}`}
    />
  )

export default SignImage
