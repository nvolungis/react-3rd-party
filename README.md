this is an example of three ways to dynamically add content, or 'modules' to a react app

## reactModule / ReactAdapter
define a regular react component that expects certain props. props give info about the app and allow
the component to change app state

## htmlModule / HTMLAdapter
define global function which will be exectured by the HTMLAdapter on mount. the function should
expect the id of the root node which to mount its code to, some initial data, a way to update data,
and an event emitter which notifies the module of data change. this is unsafe and runs code in
global scope.

## iframeModule / IframeAdapter
define some html that renders a script tag. the script will have access to an `api` object on window
which allows it to receive data and update data back in the app. this one is safe as all module
code runs in the iframe.

to start run
### `npm install && npm start`

you can click each of the lines as an example of each module affecting app state ( it just toggles a flag )

clicking `clear` will flush the module registry. open the console and execute `run` to bring them back.

