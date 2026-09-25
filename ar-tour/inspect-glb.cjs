const fs = require("fs");
const path = process.argv[2];
const buf = fs.readFileSync(path);

const magic = buf.readUInt32LE(0);
if (magic !== 0x46546c67) throw new Error("Not a GLB file (bad magic)");
const version = buf.readUInt32LE(4);
const totalLength = buf.readUInt32LE(8);

let offset = 12;
let json = null;
while (offset < totalLength) {
  const chunkLength = buf.readUInt32LE(offset);
  const chunkType = buf.readUInt32LE(offset + 4);
  const chunkData = buf.subarray(offset + 8, offset + 8 + chunkLength);
  if (chunkType === 0x4e4f534a) {
    // 'JSON'
    json = JSON.parse(chunkData.toString("utf8"));
  }
  offset += 8 + chunkLength;
}

if (!json) throw new Error("No JSON chunk found");

console.log("glTF version:", version, "| file size:", (buf.length / 1024 / 1024).toFixed(2), "MB");
console.log("\nAnimations (" + (json.animations || []).length + "):");
(json.animations || []).forEach((a, i) => console.log(`  [${i}] "${a.name || "(unnamed)"}"`));

console.log("\nMeshes:", (json.meshes || []).length);
console.log("Skins (rigs):", (json.skins || []).length);
console.log("Nodes:", (json.nodes || []).length);

console.log("\nScene node names (top-level):");
const scene = json.scenes && json.scenes[json.scene ?? 0];
if (scene) {
  scene.nodes.forEach((nodeIdx) => {
    console.log(`  - ${json.nodes[nodeIdx].name || "(unnamed)"}`);
  });
}

console.log("\nMesh bounding boxes (raw model units):");
(json.meshes || []).forEach((mesh, mi) => {
  mesh.primitives.forEach((prim, pi) => {
    const posAccessorIdx = prim.attributes.POSITION;
    const acc = json.accessors[posAccessorIdx];
    if (acc && acc.min && acc.max) {
      const size = acc.max.map((v, i) => (v - acc.min[i]).toFixed(3));
      console.log(`  mesh[${mi}].prim[${pi}]: min=${JSON.stringify(acc.min.map(n=>+n.toFixed(3)))} max=${JSON.stringify(acc.max.map(n=>+n.toFixed(3)))} size(xyz)=${size}`);
    }
  });
});

console.log("\nMaterials:", (json.materials || []).length);
console.log("Textures:", (json.textures || []).length, "Images:", (json.images || []).length);
