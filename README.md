# @duiyuan/detect-provider

A tiny utility for detecting the Dioxide-wallet provider which injected at `window.dioxide` after install the diox-wallet chrome extension.

## Usage

#### ES Module

```
import detectDioxideProvider from '@dioxide-js/detect-provider'

const provider = await detectDioxideProvider()

if (provider) {

  console.log('dioxide successfully detected!')

  // From now on, this should always be true:
  // provider === window.dioxide

  // Access the decentralized web!

  const chainId = await provider.request({
    method: 'diox_chainId'
  })
} else {

  // if the provider is not detected, detectDioxideProvider resolves to null
  console.error('Please install Dioxide-Wallet!', error)
}

```

#### HTML

```
<script src="https://unpkg.com/@dioxide-js/detect-provider/dist/detect-provider.umd.min.js"></script>
<script type="text/javascript">
  const provider = await dioxideDetectProvider({timeout: 3000})
  if (provider) {
    // handle provider
  } else {
    // handle no provider
  }
</script>

```

#### Options

##### options.timeout

Type: `number`  
Default: 3000  
Milliseconds to wait for asynchronously injected providers.
