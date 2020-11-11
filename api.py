from tiki_bar import Tiki_Bar
from fastapi import FastAPI
import ast

my_bar = Tiki_Bar('all_drinks.csv')

app = FastAPI()

@app.get("/all_ingredients")
def all_ingredients():
    return my_bar.all_ingredients

@app.get("/by_ingredient/{ingredient}")
def by_ingredient(ingredient: str):
    return my_bar.recipe_by_ingredient(ingredient)

@app.put("/on_hand/{list_of_ingredients}")
def by_ingredient(list_of_ingredients: str):
    ing_to_add = ast.literal_eval(list_of_ingredients)
    for i in ing_to_add:
        my_bar.on_hand.append(i)
    return {"Updated": my_bar.on_hand}

@app.put("/can_make/{exact}")
def can_make({exact}: int):
    