# tikiBar 🍹

An app for finding and filtering top-notch tiki. A little bit on the structure of this projectt:
* Web app: Front end w/ vanilla Javascript, Back end w/ [FastAPI](https://fastapi.tiangolo.com/). To launch, start the Python backend with `python api.py` and then launch the frontend. Depending on your configuration, may need to update port settings. 
* Eel app: same app built w/ [Eel Framework](https://github.com/samuelhwilliams/Eel) for a desktop version. To launch, just navigate to the folder and run `python tiki_app.py`

### Background
In short, I love tiki drinks! The problem I often run into though is keeping up with all the syrups, rums, and liquers necessary to make any particular drink. I have a lot of great sources (*Smuggler's Cove*, *Easy Tiki*, etc.), but putting together those details with what I have on hand is time consuming. You mix these ingredients together, and you get the need for an app!  

### Process
My basic approach was to start with building a Python-based backend and a basic front end to interact with. I didn't involve database at this point as I'm working with a really small data source and will probabaly explore further as I go. Currently, the data file (manually copied ingredient details from books into parse matrix) gets loaded into my tiki bar Class which has functions for filtering and navigating Pandas Dataframe. The tiki bar Class is accessed through FastAPI. The front end was built to allow filtering recipes based on the ingredients you have on hand, and can create some wiggle in exactness of the recipe (can change whether you have exactly the right ingredients, or see other recipes where you are missing 1 or 2 ingredients)

After finishing the web app version, I refactored to a desktop app with Eel. I did this for a few reasons, primarily 1. I am much more comfortable styling and creating layouts in HTML/CSS, so I was able to keep most of what I had already done, 2. My backend was already built with Python, so why throw that away? 3. I wanted to get a chance to build with Eel to see what it was like, and really enjoyed it. 
### Current progress
Project does work as is, still with more tweaks and improvements on the way. The backend code can be documented better, front end has many possible improvements.

----
### Backlog
* Potentially refactor front end into React
* Add more views, such as see all recipes by one ingredient
* Create search to query by recipe name or ingredient name
* Make whole thing more mobile friendly. Current tabbed layout works best on desktop. Will need some more time to change UI


