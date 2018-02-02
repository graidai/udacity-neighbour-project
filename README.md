## Neighbourhood Map Project

A Udacity project to map Barbecue Places in Austin.This single page application follows the MVVM design pattern using Knockout.

Preface - If your are new to Austin, you might wanna find out about the different BBQ places in Austin. The Breakfast Taco war with San Antonio has been long and shows no sign of finding a victor anytime soon. However when it comes to BBQ, the winner is unanimous (ie. within the state lines).


## Dependencies
To run the web app simply:
1 - clone the repo
2 - on your command line, run bower install
    (if you don't have bower, install it from https://bower.io/#getting-started)

There are only 2 dependencies for the app to run - Knockout and jQuery. The application uses Google Map APIs and Foursquare APIs to fetch the information of the specified locations. All network calls are made asynchronously.

## Instructions to run the web app
The app contains an interactive map overlaying on the whole page and a sidebar which can be pull with the pull button.

All the available locations are displayed on the map initially. Each location marker can be click to view the info of the location.

The side bar has following components:
  1 - Filter input field
  2 - Filter Button with Realtime Toggle
  3 - List of the locations
  4 - Reset Button

1. Filter Input Field: User can type on the input field to filter the location displaying on the map. Typing the location name will filter both names on the list and the markers on the map [by default] ![](https://github.com/graidai/udacity-neighbour-project/blob/master/static/filterToggleOff.png). User has the option to make the filtering work only when only clicking on the filter button.
2. Filter Button: Clicking on the filter button filters the locations on the list to match the markers on the map. However, if the user wishes to filter both the locations and markers as the user types on the input field, the user has to toggle the button next to the filter button on the right ![](https://github.com/graidai/udacity-neighbour-project/blob/master/static/filterToggleOn.png). The Realtime display toggle button.
3. List of the locations: Displays the locations available. User can click on the individual location to display the information of the location on the map. When hovering on a locations, a yellow expand button ![](https://github.com/graidai/udacity-neighbour-project/blob/master/static/yellowBtn.png) appears. On clicking the expand button ![](https://github.com/graidai/udacity-neighbour-project/blob/master/static/yellowBtn.png), the user will be able to see more detail information of the location on modal display.
![](https://github.com/graidai/udacity-neighbour-project/blob/master/static/modal.png)
4. Reset Button: Resets the view of the map to the original location.
