import pandas as pd
import eel

# Set web files folder
eel.init('web')

my_bar = pd.read_csv('all_drinks.csv')

@eel.expose
def all_ingredients():
    return list(my_bar.columns)[6:]

# @eel.expose
# def by_ingredient(ingredient):
#     if ingredient in my_bar.on_hand:
#         my_bar.on_hand.remove(ingredient)
#     else:
        
#         my_bar.on_hand.append(ingredient)
#     return my_bar.on_hand

# @eel.expose
# def can_make(exact):
#     return my_bar.what_can_i_make(exact=exact)

eel.start('hello.html', size=(900, 550))  # Start




