# Material Design prototype


This is a prototype to get some web based material deisgn off of the ground.

## Install

use npm to install the dependancies for thsi project

```bash
npm install
```

This is also download the bower dependancies


You will need either the Android sdk, xcode or the Windows phone build tools installed to build this project

After you have installed the relevant build tools the desired platform will then need to be downloaded and installed, this cam be done by:

```bash
npm run add:android
```

Replace android with one of the following options:
- android
- ios
- wp8
- wp8.1

You should then be ready to go.


## Building

The same as with the installation step you will need to replace the end of the command with the relevant platform

```bash
npm run build:android
```

This should then build the application inside the platforms folder.

You will then need to use whatever tools your platform needs to install the application to a device.

Android used adb, iOS uses xcode

You can attempt to use the run command but results may vary

```bash
npm run run:android
```
"run run" is not a mistake, I have not come up with a better name yet.