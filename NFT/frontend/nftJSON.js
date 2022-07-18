import { NFTStorage } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
const token =
  new URLSearchParams(window.location.search).get("key") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZFZTNBNDc5NDU3RjcxMDg3ODJhYzM0NjM2NTRDOTgwRjM4MzBGYzYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzcxMjgwMzY5MiwibmFtZSI6Im5mdCJ9.ysknPSy9QKx3nqzDdq-FDNWQACECFWOYxXzgiITpsQU"; // your API key from https://nft.storage/manage

function log(msg) {
  msg = JSON.stringify(msg, null, 2);
  document.getElementById("out").innerHTML += `${msg}\n`;
}
let metadata;
console.log(metadata);
document.querySelector("form").addEventListener("submit", async e => {
  e.preventDefault();
  const nameEl = document.querySelector('input[id="name"]');
  const desEl = document.querySelector('input[id="description"]');
  const trait = document.querySelector('input[id="trait"]');
  const value = document.querySelector('input[id="value"]');
  if (!nameEl.value) return log("Missing name");
  const fileEl = document.querySelector('input[type="file"]');
  if (!fileEl.files.length) return log("No files selected");
  const storage = new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZFZTNBNDc5NDU3RjcxMDg3ODJhYzM0NjM2NTRDOTgwRjM4MzBGYzYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzcxMjgwMzY5MiwibmFtZSI6Im5mdCJ9.ysknPSy9QKx3nqzDdq-FDNWQACECFWOYxXzgiITpsQU",
  });
  try {
    sessionStorage.setItem("ASD", nameEl.value);

    metadata = await storage.store({
      name: nameEl.value,
      description: desEl.value,
      image: fileEl.files[0],
      external_url: "https://openseacreatures.io/3", //??

      attributes: [
        {
          trait_type: trait.value,
          value: value.value,
        },
      ],
    });
    log({ "cid : ": metadata.ipnft });
    log({ "IPFS URL for the metadata": metadata.url });
    log({ "metadata.json contents": metadata.data });
    log({
      "metadata.json contents with IPFS gateway URLs": metadata.embed(),
    });
    sessionStorage.setItem("metadata", metadata.ipnft);
    // localStorage.setItem("23", JSON.parse(metadata));
  } catch (err) {
    console.error(err);
    log(err.message);
  }
});
