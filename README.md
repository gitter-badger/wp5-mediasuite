# L A B O

LABO is the web environment where you can experiment with different functionalities and APIs developed in the context of Sound & Vision labs, developed by the R&D department of [The Netherlands Institute for Sound and Vision](http://www.beeldengeluid.nl/).

Underlying LABO's user interface, is the component library, which is also part of this code base.

[This README should be updated. It is quite outdated]

**Current version**: 0.0.9

## Component library

In CLARIAH WP5 the choice was made to steer clear from implementing monolithic tools and instead to focus on the implementation of
reusable functionalities, which can be:

* Services exposed by an API, such as the currently available search, collection and annotation APIs
* UI components, such as a facet search component an LOD browser (DIVE) or visualisations such as different charts or graphs.
* Other t.b.d.

Next to functionalities CLARIAH WP5 uses the term 'recipe' when talking of a certain combination of aforementioned functionalities.
Aiming for a high flexibility in assembling recipes the media suite aims to:

* Recreate the existing tools by creating a recipe for each tool
* Create new recipes/tools for use-cases/users that were previously not serviced
* Expand/improve the available ingredients (functionalities) together with third parties


## How do I get set up?

### Flask webserver (Python)

This project runs on Python 2.7

The best practice is to create a virtualenv and subsequently run:

```
pip install -r requirements.txt
```

This way all the necessary Python packages will be installed.

Now the only thing to do is to create a settings.py by copying the settings-example.py file:

```
cp settings-example.py settings.py
```

Following this it should already be possible to start the Flask webserver using

```
python server.py
```

**Note**: make sure you set the RECIPES_PATH correctly in your settings.py

### Javascript / React components

Now that the webserver is setup, it is necessary to obtain and build all of the required Javascript packages.

The CLARIAH component library (based on [React](https://facebook.github.io/react/)) uses the following for packaging & compiling:

* [npm](https://www.npmjs.com/)
* [Webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)

To work on the library, do the following:

#### Install npm

If you haven't already first install [npm](https://www.npmjs.com/). Then go into /src/static (containing package.json) and run:

```
npm install
```

Note: You might need to be sudo for this.

#### Start the webpack watcher

The watcher makes sure the CLARIAH component library is built/updated in /src/static/public/assets/benglabs.js
For this, the watcher reacts to any changes made in the /src/static/app folder, which contains the CLARIAH library code.

To start the watcher, go into the /src/static (containing webpack.config.js) and run:

```
npm run dev
```

Note that this is not a default command of npm, but works because a script (calling webpack) has been configured for this in package.json.


#### Other custom npm scripts

```
npm run prod
```

This will run webpack.config.prod.js is to produce the minified benglabs.min.js. For production deployments, please update recipe.html and components.html with this minified version

```
npm run build
```

This runs the webpack.config.js just once


#### Start the compass watcher

LABO Uses the [SASS](http://sass-lang.com/) CSS extension language in combination with [Compass](http://compass-style.org/) to generate the main stylesheet (/src/static/css/main.css).

So, whenever you want to change the overall styling: make sure that Compass is installed, then start the compass watcher by going into the /src/static folder and running:

```
compass watch
```

While the watcher is running any changes to the *.scss files in the /static/sass folder will be compiled into /src/static/css/main.css

You can change the compass configuration by editing /src/static/config.rb

# Recipes

There are two ways to define recipes:

1 With a recipe configuration
2 Build it yourself, using the component library

## Configure a recipe

Currently there are a number of recipes already configured in src/resources/recipes

Each recipe configuration is a JSON file and currently has very limited options. For now: just inspect the examples and you should be pretty much up-to-date with what can be configured.

After creating a recipe config, you can load it in your HTML page, as follows (also see /src/templates/recipe.html):

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
<script type="text/javascript" src="/static/js/playout/froogaloop.js"></script>
<script src="/static/js/config.js" type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react-dom.js"></script>
<script src="/static/public/assets/benglabs.js" type="text/javascript"></script>
<script>
	var config = ''//TODO load your config JSON file from wherever
	clariah.cookRecipe(config, 'app');
</script>
```

**Note**:

* The d3 import is only necessary when including the LineChart or CollectionAnalyser within your recipe
* The froogaloop import is only needed whenever you are creating a recipe of the type: 'annotation' (see video-annotation.json)
* The config.js contains information about where the APIs are running

## Build your own recipe with the component library

The idea of the component library is to (also) be able to use it within your own simple HTML/Javascript page without needing a lot of difficult webpack configurations and what not.

The best example of going about this is to look at /src/templates/components.html and /src/static/js/labo-components.js

At this moment you require the following imports before the benglabs.js will work properly:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react-dom.js"></script>
```

After that you can simply include:

```
<script src="/static/js/config.js"></script>
<script src="/static/public/assets/benglabs.js"></script>
<script type="text/babel" src="/static/js/YOUR-OWN.js"></script>
```

**Note**: the config.js is also still needed as it contains the connection information to the B&G APIs. At some point this will be part of a more developer friendly config

## Reading

https://docs.google.com/presentation/d/1afMLTCpRxhJpurQ97VBHCZkLbR1TEsRnd3yyxuSQ5YY/edit#slide=id.p

## Who do I talk to? ###

* Jaap Blom