exports.default = async function (configuration) {
  if (configuration.path) {
    const keypairAlias = process.env.SM_KEYPAIR_ALIAS

    if (!keypairAlias) {
      console.log('SM_KEYPAIR_ALIAS environment variable is not set; skipping code signing.')
      return
    }

    require('child_process').execSync(
      `smctl sign --keypair-alias="${keypairAlias}" --input "${String(configuration.path)}" --verbose`,
      {
        stdio: 'inherit',
      },
    )
  }
}
