## Development:

Created a lottery picker react native app along with Add Play, Play Numbers and  Purchase feature.

### App name: ACME Lottery Picker
```
Developed a screen to add a lottery pick, display the selected lottery picks and purchase the selected lottery picks.
```
## Developed a second screen for Number Selection with the following fields:
```
1. Selected numbers portion
2. 1 to 42 numbers grid
3. Play Numbers button 
4. A back button
```

## Add Play screen includes the following features:
```
1. The Add Play button will take the user to the Number Selection screen.
2. A flatlist with lottery picks will be displayed also with a delete row button.
3. Delete row button will delete the pick from the list and also update the global state.
4. Purchase button will be disabled when there is not even a single pick and tapping on the same with at least a single pick or less than three should display an alert showing the selections from the global state along with the Lottie animation.
5. If a user tries adding more than 3 picks an alert will be displayed like Maximum only 3 picks are allowed. Delete the old one and try again!
```

## Number selection screen includes the following features:
```
1. Users can select a number only once per pick(Duplicate picks are not allowed) and tapping on the same number will unselect it.
2. Selected numbers will be highlighted.
3. Only 5 numbers are allowed to be selected.
4. Until the user selects all the 5 numbers the Play Numbers button will be disabled.
5. A number belongs to its respective top circle which means if a user unselects a number it will be removed from the respective top circle and if the user selects another number the same circle will be filled again(priority is from left to right if multiple numbers are unselected and selecting numbers again).
6. If the user tries to pick 5 numbers which is the same sequence of numbers selected before then an alert will be shown like Same pick already selected. Please choose another sequence.
7. Tapping on the Play Numbers with a unique pick should take the user to the Add Play screen and update the global state.
8. Back button should take the user to the Add Play screen.
```

## Testing approach:
Tested all possible ways the above feature would be used.

```
Step 1: Open the Lottery Picker app.
Step 2: In the Add Play screen tap on the Add Play button(user will be navigated to the Number Selection screen).
Step 3: In the Number Selection screen pick 5 numbers and the top selected numbers portion should be updated with the selected numbers.
Step 4: Tap on the Play Numbers button(user should be navigated to the Add Play screen).
Step 5: The flatlist now will have a lottery pick with a delete row button.
Step 6: Tap on the delete row button and the lottery pick should be deleted from the list.
Step 7: Have at least one pick in the list and tap on purchase, an alert should be displayed with the selections with Lottie animation.
```
