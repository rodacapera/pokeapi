module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			node: true,
			jsx: true,
		},
	},
	env: {
		browser: true,
		'react-native/react-native': true,
	},
	plugins: ['react-native', 'prettier'],
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'prettier/react', 'react-app'],
	rules: {
		'prettier/prettier': [
			'warn',
			{
				endOfLine: 'auto',
			},
		],
		'non-unused-expressions': 'off',
		'spaced-comment': ['warn', 'always'],
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
		'react-native/no-inline-styles': 2,
		'react-native/no-color-literals': 2,
		'react-native/no-raw-text': 2,
		'react-native/sort-styles': [
			'error',
			'asc',
			{
				ignoreClassNames: false,
				ignoreStyleProperties: true,
			},
		],
	},
};
