// @flow

import type File from "./file/file";

export default class PluginPass {
  _map: Map<mixed, mixed> = new Map();
  key: ?string;
  file: File;
  opts: Object;

  // The working directory that Babel's options are loaded relative to.
  cwd: string;

  // The path of the file being compiled, relative to the working directory.
  filename: string | void;

  constructor(file: File, key: ?string, options: ?Object) {
    this.key = key;
    this.file = file;
    this.opts = options || {};
    this.cwd = file.opts.cwd;
    this.filename = file.opts.filename;
  }

  set(key: mixed, val: mixed) {
    this._map.set(key, val);
  }

  get(key: mixed): any {
    return this._map.get(key);
  }

  addHelper(name: string) {
    return this.file.addHelper(name);
  }

  addImport() {
    return this.file.addImport();
  }

  getModuleName(): ?string {
    return this.file.getModuleName();
  }

  buildCodeFrameError(
    node: ?{
      loc?: { start: { line: number, column: number } },
      _loc?: { start: { line: number, column: number } },
    },
    msg: string,
    Error?: typeof Error,
  ) {
    return this.file.buildCodeFrameError(node, msg, Error);
  }
}
