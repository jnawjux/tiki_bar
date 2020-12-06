import pandas as pd
import eel

# Set web files folder
eel.init('web')

my_bar = pd.read_csv('web/all_drinks.csv')
my_ingredients = []

with open('web/current.txt', 'r') as f:
    lines = (line.rstrip() for line in f) # All lines including the blank ones
    lines = (line for line in lines if line) # Non-blank lines
    my_ingredients.extend(lines)


def save_ingredients_on_close(route, websockets):
    with open('web/current.txt', 'w') as f:
        for i in my_ingredients:
            if i != "":
                f.write(i + "\n")

@eel.expose 
def get_ingredients():
    return my_ingredients

@eel.expose
def update_ingredients(ing):
    if ing in my_ingredients:
        my_ingredients.remove(ing)
    else:
        my_ingredients.append(ing)
    return my_ingredients


@eel.expose
def what_can_i_make(exact=0):
    found = []
    # Creating one list with ids for all items that match any one ingredient
    for item in my_ingredients:
        if item != "":
            found.extend(my_bar[my_bar[item] == 1]['drink_id'].tolist())

    # Turning that list into a frequency dictionary
    freq = {item: found.count(item) for item in found}

    # Creating dictionaries for each drink with its frequency count, common for matching all
    common_dict = {id: tot - exact for id, tot in zip(my_bar.drink_id.tolist(),
                                                        my_bar.ingredient_count.tolist()) if tot - exact > 0}

    # Finding matching items (key, value)
    common_id = [id[0] for id in list(freq.items() & common_dict.items())]

    #Getting drink name for matches
    name = my_bar[my_bar.drink_id.isin(common_id)].drink.values
    ingredients = my_bar[my_bar.drink_id.isin(common_id)].full_recipe.values
    steps = my_bar[my_bar.drink_id.isin(common_id)].steps.values
    # if len(common_id) == 0:
    #     pass
    # else:
    results = []
    for n, i, s in zip(name, ingredients, steps):
        drink = {"name": n, "ingredients": i, "steps": s}
        results.append(drink)
    return results

eel.start('tiki.html', 
           size=(1000, 700),
           mode='chrome', 
           close_callback=save_ingredients_on_close)  # Start




