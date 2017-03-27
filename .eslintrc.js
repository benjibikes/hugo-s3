module.exports = {
    // https://github.com/bodil/eslint-config-cleanjs
    "extends": "cleanjs",
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-commonjs": 0,
        "fp/no-mutation": ["error", {"commonjs": true}],

        // spacing -- https://gist.githubusercontent.com/alexnm/402c2355240808177c7c9b9c83bff0a5/raw/6de960abec60741eba4705323d02ddb021ae9580/eslintrc.js
        // "space-in-parens": [ 2, "always" ],
        "template-curly-spacing": [ 2, "always" ],
        "array-bracket-spacing": [ 2, "always" ],
        "object-curly-spacing": [ 2, "always" ],
        "computed-property-spacing": [ 2, "always" ],
        "no-multiple-empty-lines": [ 2, { "max": 1, "maxEOF": 0, "maxBOF": 0 } ],

        // code arrangement matter
        "no-use-before-define": [ 2, { "functions": false } ],
    },
};
