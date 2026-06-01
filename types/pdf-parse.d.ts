declare module "pdf-parse" {
  const parse: (data: Buffer | Uint8Array | ArrayBuffer) => Promise<any>;
  export default parse;
}
