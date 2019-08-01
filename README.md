# Photo editor

WebComponents based implementation of the Canvas application. Very much POC.

### Installation

`npm install`

### Run the project

`npm run dev`

### Approach and remarks

Component framework of the application is built on top of WebComponents powered with LitElement and LitHtml. They allow component based UI architecture.

The application is split into several responsibility areas:

- Storage layer, which supports different storage strategies (uses simplest LocalStorage in my case). I didn't implement any other strategies but it should be different story non-related to this app really.

- Projects implement two scenarios: selecting new file from file system and importing existing project from the storage.

- Rendering of the photo itself is responsibility of PhotoCanvas component.

