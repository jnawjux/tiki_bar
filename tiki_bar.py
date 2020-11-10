import pandas as pd
import numpy as np
from itertools import combinations

class Tiki_Bar:
    def __init__(self, on_hand=[]):
        self.all_drinks_db = pd.read_csv('all_drinks.csv')
        self.all_ingredients = list(self.all_drinks_db.columns)[6:]
        self.all_recipe_names = self.all_drinks_db.drink.tolist()
        self.all_types_glassware = self.all_drinks_db.glass.unique().tolist()
        self.on_hand = on_hand
    def recipe_by_ingredient(self, ingredient):
        if ingredient in self. all_ingredients:
            name = self.all_drinks_db[self.all_drinks_db[ingredient] == 1].drink.values
            ingredients = self.all_drinks_db[self.all_drinks_db[ingredient] == 1].full_recipe.values
            nl = "\n"
            print("Recipes with the ingredient:")
            for n,i in zip(name, ingredients):
                print(f"{n}{nl}------{nl}{i}{nl}------{nl}")
        else:
            print("Ingredient not listed")
    
    def what_can_i_make(self, exact=0):
        found = []
        # Creating one list with ids for all items that match any one ingredient
        for item in self.on_hand:
            found.extend(self.all_drinks_db[self.all_drinks_db[item] == 1]['drink_id'].tolist())

        # Turning that list into a frequency dictionary
        freq = {item: found.count(item) for item in found}

        # Creating dictionaries for each drink with its frequency count, common for matching all
        common_dict = {id: tot - exact for id, tot in zip(self.all_drinks_db.drink_id.tolist(),
                                                  self.all_drinks_db.ingredient_count.tolist())
                                                  if tot - exact > 0}

        # Finding matching items (key, value)
        common_id = [id[0] for id in list(freq.items() & common_dict.items())]

        #Getting drink name for matches
        name = self.all_drinks_db[self.all_drinks_db.drink_id.isin(common_id)].drink.values
        ingredients = self.all_drinks_db[self.all_drinks_db.drink_id.isin(common_id)].full_recipe.values
        if len(name) == 0:
            print("None found")
        else:
            nl = "\n"
            print("Can make:")
            for n,i in zip(name, ingredients):
                print(f"{n}{nl}------{nl}{i}{nl}------{nl}")