1. No css: ```npm run moe-build -- --reactTemplateFilepath Hello/index.js --moeFilepath hello-v1.html```

2. With css (and imported stylesheets): ```npm run moe-build -- --reactTemplateFilepath Hello/index.js --moeFilepath hello-v1.html --templateStylesFilepath Hello/styles.css```

3. With css (and imported stylesheets) within a dir (even if parent dir doesn't exist): ```npm run moe-build -- --reactTemplateFilepath Hello/index.js --moeFilepath examples/hello-v1.html --templateStylesFilepath Hello/styles.css```