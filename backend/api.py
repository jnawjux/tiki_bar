from tiki_bar import Tiki_Bar
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

my_bar = Tiki_Bar('all_drinks.csv')

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/get_on_hand")
def all_ingredients():
    return my_bar.on_hand

@app.post("/on_hand/{ingredient}")
def by_ingredient(ingredient: str):
    if ingredient in my_bar.on_hand:
        my_bar.on_hand.remove(ingredient)
    else:
        
        my_bar.on_hand.append(ingredient)
    return my_bar.on_hand

@app.get("/can_make/{exact}")
def can_make(exact: int):
    return my_bar.what_can_i_make(exact=exact)

"""
Still working on implimenting these

@app.get("/all_ingredients")
def all_ingredients():
    return my_bar.all_ingredients



@app.get("/by_ingredient/{ingredient}")
def by_ingredient(ingredient: str):
    return my_bar.recipe_by_ingredient(ingredient)
"""