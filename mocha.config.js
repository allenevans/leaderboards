// disable specific non-javascript imports.
['.css', '.scss'].forEach(ext => {
  require.extensions[ext] = () => null;
});
