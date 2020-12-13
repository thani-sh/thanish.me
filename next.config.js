const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  inlineImageLimit: false,
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
            publicPath: '/_next/static/images',
            outputPath: 'static/images',
          },
        },
      ],
    });
    return config;
  },
});
